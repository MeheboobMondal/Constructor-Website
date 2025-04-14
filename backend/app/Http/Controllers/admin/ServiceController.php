<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;

use App\Models\Service;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\GD\Driver;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Service::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'data' => $data,
            'message' => 'All Services Data'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required'

        ]);

        if($valid->fails()){
            return response()->json([
                'status' => false,
                'errors' => $valid->errors()
            ]);
        }

        // Service::create([
        //     'title' => $request->title,
        //     'slug' => str::slug($request->slug),
        //     'shortDesc' => $request->shortDesc,
        //     'content' => $request->content,
        //     'status' => $request->status
        // ]);
        $itm = new Service;
        $itm->title = $request->title;
        $itm->slug = str::slug($request->slug);
        $itm->shortDesc = $request->short;
        $itm->content = $request->content;
        $itm->status = $request->status;
        // save temp image here
        if($request->imageId > 0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extarray = explode(".", $tempImage->tempimg);
                $ext = last($extarray);

                $fileName = time().$itm->id.".".$ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->tempimg);

                // save small image
                $destPath = public_path('uploads/service/small/' . $fileName);

                $manager = new ImageManager(new Driver());
                $image = $manager->read($sourcePath); 
                $image->coverDown(500, 600);
                $image->save($destPath);
                
                // save large image
                $destPath = public_path('uploads/service/large/' . $fileName);

                $manager = new ImageManager(new Driver());
                $image = $manager->read($sourcePath); 
                $image->scaleDown(1200);
                $image->save($destPath);

                

                $itm->image = $fileName;

                // delete temp image 
                if(File::exists($sourcePath)){
                    File::delete($sourcePath);
                }
               
            }
        }
        $itm->save();

        return response()->json([
            'status' => true,
            'message' => "Service added successfully!!"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $itm = Service::find($id);
        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'Service Not Found!'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $itm,
            'message' => 'all data fetched'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $itm = Service::find($id);

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => "Servic not found!"
            ]);
        }

        $itm->title = $request->title;
        $itm->slug = str::slug($request->slug);
        $itm->shortDesc = $request->short;
        $itm->content = $request->content;
        $itm->status = $request->status;
      
        $oldimage = $itm->image;

        // save temp image here
        if($request->imageId > 0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extarray = explode(".", $tempImage->tempimg);
                $ext = last($extarray);

                $fileName = time().$itm->id.".".$ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->tempimg);

                // save small image
                $destPath = public_path('uploads/service/small/' . $fileName);

                $manager = new ImageManager(new Driver());
                $image = $manager->read($sourcePath); 
                $image->coverDown(500, 600);
                $image->save($destPath);
                
                // save large image
                $destPath = public_path('uploads/service/large/' . $fileName);

                $manager = new ImageManager(new Driver());
                $image = $manager->read($sourcePath); 
                $image->scaleDown(1200);
                $image->save($destPath);

                if($oldimage != ''){
                    File::delete(public_path("uploads/service/large/".$oldimage));
                    File::delete(public_path("uploads/service/small/".$oldimage));
                }

                $itm->image = $fileName;
               
                 // delete temp image 
                 if(File::exists($sourcePath)){
                    File::delete($sourcePath);
                }
            }
        }

        $itm->save();
        
        return response()->json([
            'status' => true,
            'data' => $itm,
            'message' => "Service Update Successfully!"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $itm = Service::find($id);
        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => "Service Not Found!"
            ]);
        }
        $paths = [
                public_path('uploads/service/small/'.$itm->image),
                public_path('uploads/service/large/'.$itm->image)
        ];
        foreach ($paths as $path) {
            if(File::exists($path)){
                File::delete($path);
            }
            
        }
        $itm->delete();

        return response()->json([
            'status' => true,
            'message' => "Service deleted Successfully!"
        ]);
    }
}
