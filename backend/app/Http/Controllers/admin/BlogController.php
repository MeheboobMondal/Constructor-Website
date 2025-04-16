<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class BlogController extends Controller
{
    //create article function
    public function create(Request $request){

        $request->merge(['slug' => Str::slug($request->slug)]);

        $valid = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:blogs,slug'
        ]);

        if($valid->fails()){
            return response()->json([
                'status' => false,
                'message' => $valid->errors()
            ]);
        }

        $itm = new Blog();
        
        $itm->title = $request->title;
        $itm->slug = Str::slug($request->slug);
        $itm->author = $request->author;
        $itm->content = $request->content;
        $itm->status = $request->status;

        // store image

        if($request->imageId > 0){
            $tempImg = TempImage::find($request->imageId);

            $sourcePath = public_path('uploads/temp/'.$tempImg->tempimg);

            // create new file name
            $fileName = $tempImg->tempimg;
            $extarray = explode('.', $fileName);
            $ext = last($extarray);

            $imageName = time().'.'.$ext;

            // store small image
            $destPath = public_path('uploads/blogs/small/'.$imageName);
            $manager = new ImageManager(new Driver());
            $image = $manager->read($sourcePath);
            $image->coverDown(450,300);
            $image->save($destPath);
            
            // store large image
            $destPath = public_path('uploads/blogs/large/'.$imageName);
            $manager = new ImageManager(new Driver());
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $itm->image = $imageName;

            

            if(File::exists($sourcePath)){
                File::delete($sourcePath);
            }
        }

        $itm->save();

        return response()->json([
            'status' => true,
            'message' => 'Blog Created Successfully'
        ]);
    }

    // fetch all articles 

    public function show(){
        $itm = Blog::orderBy('created_at', 'DESC')->get();
        
        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'Articles Not Found'
            ]);
        }else{
            return response()->json([
                'status' => true,
                'data' => $itm,
                'message' => 'All Data Fetched Successfully!'
            ]);
        }
    }

    // fetch all articles 

    public function index($id){
        $itm = Blog::find($id);
        
        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'Articles Not Found'
            ]);
        }else{
            return response()->json([
                'status' => true,
                'data' => $itm,
                'message' => 'All Data Fetched Successfully!'
            ]);
        }
    }

    // update articles data

    public function update(Request $request, $id){

        $itm = Blog::find($id);
        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'Articles Not Found!'
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);

        $valid = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:blogs,slug,'.$id.',id'
        ]);

        if($valid->fails()){
            return response()->json([
                'status' => false,
                'message' => $valid->errors()
            ]);
        }

        
        
        $itm->title = $request->title;
        $itm->slug = Str::slug($request->slug);
        $itm->author = $request->author;
        $itm->content = $request->content;
        $itm->status = $request->status;

        // store image

        if($request->imageId > 0){
            $tempImg = TempImage::find($request->imageId);
            $oldImg = $itm->image;

            $sourcePath = public_path('uploads/temp/'.$tempImg->tempimg);

            // create new file name
            $fileName = $tempImg->tempimg;
            $extarray = explode('.', $fileName);
            $ext = last($extarray);

            $imageName = time().'.'.$ext;

            // store small image
            $destPath = public_path('uploads/blogs/small/'.$imageName);
            $manager = new ImageManager(new Driver());
            $image = $manager->read($sourcePath);
            $image->coverDown(450,300);
            $image->save($destPath);
            
            // store large image
            $destPath = public_path('uploads/blogs/large/'.$imageName);
            $manager = new ImageManager(new Driver());
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $itm->image = $imageName;

            

            if(File::exists($sourcePath)){
                File::delete($sourcePath);
            }

            // delete older image in large and small directory

            $paths = [
                public_path('uploads/blogs/small/'.$oldImg),
                public_path('uploads/blogs/large/'.$oldImg),
            ];

            foreach ($paths as $path) {
                if(File::exists($path)){
                    File::delete($path);
                }
            }
        }

        $itm->save();

        return response()->json([
            'status' => true,
            'message' => 'Blog Updated Successfully'
        ]);
    }

    public function destroy($id){
        $itm = Blog::find($id);

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'Articles not found'
            ]);
        }else{
            $imageName = $itm->image;
            $paths = [
                public_path('uploads/blogs/small/'.$imageName),
                public_path('uploads/blogs/large/'.$imageName)
            ];

            foreach ($paths as $path) {
                if(File::exists($path)){
                    File::delete($path);
                }
            }

            $itm->delete();

            return response()->json([
                'status' => true,
                'message' => 'Articles Deleted Successfully'
            ]);
        }
    }
}
