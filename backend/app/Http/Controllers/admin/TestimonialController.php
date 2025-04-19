<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class TestimonialController extends Controller
{
    public function store(Request $request){
        $valid = Validator::make($request->all(), [
            'message' => 'required',
            'citation' => 'required',
        ]);

        if($valid->fails()){
            return response()->json([
                'status' => false,
                'message' => $valid->errors()
            ]);
        }

        $itm = neW Testimonial();
        $itm->message = $request->message;
        $itm->citation = $request->citation;
        $itm->status = $request->status;
        
        if($request->imageId > 0){
            $tempImg = TempImage::find($request->imageId);

            $extarray = explode('.', $tempImg->tempimg);
            $ext = last($extarray);

            $newImgName = time().'.'.$ext;

            $sourceImg = public_path('uploads/temp/'.$tempImg->tempimg);

            // image scale reduce
            $destPath = public_path('uploads/testimonial/'.$newImgName);
            $maneger  = new ImageManager(new Driver());
            $image = $maneger->read($sourceImg);
            $image->coverDown(300,300);
            $image->save($destPath);

            // delete temp image

            if(File::exists($sourceImg)){
                File::delete($sourceImg);
            }

            $itm->image = $newImgName;
            
        }

        $itm->save();

        return response()->json([
            'status' => true,
            'message' => 'Testimonial Created Successfully'
        ]);
    }

    // show all data
    public function index(){
        $itm = Testimonial::orderBy('created_at', 'DESC')->get();

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'No Data Found!'
            ]);
        }else{
            return response()->json([
                'status' => true,
                'data' => $itm,
                'message' => 'All Testimonials Data Fetched Successfully'
            ]);
        }
    }

    // show single data
    public function singleData($id){
        $itm = Testimonial::find($id);

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'No Data Found!'
            ]);
        }else{
            return response()->json([
                'status' => true,
                'data' => $itm,
                'message' => 'Data Fetched Successfully'
            ]);
        }
    }

    // update Testimonials
    public function update(Request $request, $id){
        $itm = Testimonial::find($id);

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'No Data Found'
            ]);
        }

        $valid = Validator::make($request->all(), [
            'message' => 'required',
            'citation' => 'required',
        ]);

        $itm->message = $request->message;
        $itm->citation = $request->citation;
        $itm->status = $request->status;

        if($request->imageId > 0){
            $oldImage = $itm->image;

            $tempImg = TempImage::find($request->imageId);
            $extarray = explode('.', $tempImg->tempimg);
            $ext = last($extarray);

            $newImage = time().'.'.$ext;

            $sourcePath = public_path('uploads/temp/'.$tempImg->tempimg);
            // reduce image size
            $destPath = public_path('uploads/testimonial/'.$newImage);
            $manager = new ImageManager(new Driver());
            $image = $manager->read($sourcePath);
            $image->coverDown(300,300);
            $image->save($destPath);

            // delete oldimage from testimonail directory
            $oldPath = public_path('uploads/testimonial/'.$oldImage);
            
            $paths = [
                $sourcePath,
                $oldPath
            ];

            foreach($paths as $path){
                if(File::exists($path)){
                    File::delete($path);
                }
            }

            $itm->image = $newImage;
            
        }
        $itm->save();

        return response()->json([
            'status' => true,
            'message' => 'Testimonail Updated Successfully'
        ]);
    }

    // delete data

    public function destroy($id){
        $itm = Testimonial::find($id);

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'No Data Found'
            ]);
        }

        // delete image
        $imagePath = public_path('uploads/testimonial/'.$itm->image);
        if(File::exists($imagePath)){
            File::delete($imagePath);
        }

        // data delete from database
        $itm->delete();

        return response()->json([
            'status' => true,
            'message' => 'Data Deleted Successfully!'
        ]);
    }
}
