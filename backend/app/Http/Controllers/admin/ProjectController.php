<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\GD\Driver;

class ProjectController extends Controller
{
    public function store(Request $request){

        $request->merge(['slug' => Str::slug($request->slug)]);
        $valid = Validator::make($request->all(), [
           'title' => 'required',
           'slug' => 'required|unique:projects,slug' 
        ]);

        if($valid->fails()){
            return response()->json([
                'status' => false,
                'message' => $valid->errors()
            ]);
        }

        $itm = new Project();
        $itm->title = $request->title;
        $itm->slug = Str::slug($request->slug);
        $itm->location = $request->location;
        $itm->constructionType = $request->constructionType;
        $itm->sector = $request->sector;
        $itm->shortDesc = $request->shortDesc;
        $itm->content = $request->content;
        $itm->status = $request->status;

        if($request->imageId > 0){
            $tempimg = TempImage::find($request->imageId);

            $extarray = explode('.', $tempimg->tempimg);
            $ext = last($extarray);
            $filename = time().'.'.$ext;

            $sourcePath = public_path('uploads/temp/'.$tempimg->tempimg);
            // small size file upload
            $destPath = public_path('uploads/project/small/'.$filename);
            $manager = new ImageManager(new Driver());
                $image = $manager->read($sourcePath); 
                $image->coverDown(500, 600);
                $image->save($destPath);

            // large size image upload
            $destPathTwo = public_path('uploads/project/large/'.$filename);
            $manager = new ImageManager(new Driver());
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPathTwo);

            $itm->image = $filename;

            // delete image from the temp folder
            if(File::exists($sourcePath)){
                File::delete($sourcePath);
            }
        }
        $itm->save();

        return response()->json([
            'status' => true,
            'message' => 'Project Created Successfully',
        ]);
    }

    public function index(){
        $itm = Project::orderBy('created_at', 'DESC')->get();
        if($itm != null){
            return response()->json([
                'status' => true,
                'data' => $itm,
                'message' => 'Product Showing Successfully!'
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Product Not Found'
            ]);
        }
    }

    public function update(Request $request, $id){
        $itm = Project::find($id);

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'Project Not Found!'
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);

        $valid = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,'.$id.',id'
        ]);

        if($valid->fails()){
            return response()->json([
                'status' => false,
                'message' => $valid->errors()
            ]);
        }

        $itm->title = $request->title;
        $itm->slug = Str::slug($request->slug);
        $itm->location = $request->location;
        $itm->constructionType = $request->constructionType;
        $itm->sector = $request->sector;
        $itm->shortDesc = $request->shortDesc;
        $itm->content = $request->content;
        $itm->status = $request->status;

        if($request->imageId > 0){
            $oldImage = $itm->image;

            $tempImg = TempImage::find($request->imageId);
            
            // create new image name
            $extarray = explode('.', $tempImg->tempimg);
            $ext = last($extarray);
            $fileName = time().'.'.$ext;

            $sourceImg = public_path('uploads/temp/'.$tempImg->tempimg);

            // store small image
            $desPath = public_path('uploads/project/small/'.$fileName);
            $manager = new ImageManager(new Driver());
            $image = $manager->read($sourceImg);
            $image->coverDown(500, 600);
            $image->save($desPath);

            // store large image
            $desPath = public_path('uploads/project/large/'.$fileName);
            $manager = new ImageManager(new Driver());
            $image = $manager->read($sourceImg);
            $image->scaleDown(1200);
            $image->save($desPath);

            $paths = [
                public_path('uploads/project/small/'.$oldImage),
                public_path('uploads/project/large/'.$oldImage),
            ];

            foreach ($paths as $path) {
                if(File::exists($path)){
                    File::delete($path);
                }
            }
            $itm->image = $fileName;

            // delete image from the temp folder
            if(File::exists($sourceImg)){
                File::delete($sourceImg);
            }
        }

        $itm->save();

        return response()->json([
            'status' => true,
            'message' => 'Project Updated Successfully!'
        ]);
    }

    public function show($id){
        $itm = Project::find($id);

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'Project Not Found'
            ]);
        }else{
            return response()->json([
                'status' => true,
                'data' => $itm
            ]);
        }
    }

    public function destroy($id){
        $itm = Project::find($id);

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'Project Not Found!'
            ]);
        }else{
            $imagename = $itm->image;

            $paths = [
                public_path('uploads/project/small/'.$imagename),
                public_path('uploads/project/large/'.$imagename),

            ];

            foreach ($paths as $path) {
                if(File::exists($path)){
                    File::delete($path);
                }
            }

            $itm->delete();

            return response()->json([
                'status' => true,
                'message' => 'Project Deleted Successfully'
            ]);
        }
    }
}
