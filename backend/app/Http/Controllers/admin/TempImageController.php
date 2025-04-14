<?php

namespace App\Http\Controllers\admin;

use App\Models\TempImage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// use Intervention\Image\ImageManager;
// use Intervention\Image\Drivers\GD\Driver;
class TempImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'image' => 'required|mimes:jpg,png,gif'
        ]);

        if($valid->fails()){
            return response()->json([
                'status' => false,
                'errors' => $valid->errors()
            ]);
        }
        
        $img = $request->image;
        $ext = $img->getClientOriginalExtension();
        $FinalName = time().'.'.$ext;

        $itm = TempImage::create([
            'tempimg' => $FinalName
        ]);

        // save image in uploads/temp
        $img->move(public_path('uploads/temp'), $FinalName);

        // $sourcePath = public_path('uploads/temp/' . $FinalName);
        // $thumbPath = public_path('uploads/thumb/' . $FinalName);

        // create new image instance
        // $image = ImageManager::imagick()->read($sourcePath); 
        // $image->coverDown(300, 300);
        // $image->save($thumbPath);

        return response()->json([
            'status' => true,
            'message' => 'image uploaded successfully!',
            'data' => $itm
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TempImage $tempImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TempImage $tempImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TempImage $tempImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TempImage $tempImage)
    {
        //
    }
}
