<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class change_passwordController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();
        if (Hash::check($request->old_password, $user->password)) {
            $user->password = Hash::make($request->new_password);
            $user->save();
            return response()->json([
                "message" => 'تم اعادة تعيين الرمز السري',
            ],200);
        }else {
            return response()->json([
                "message" => 'الرمز السري الحالي غير صحيح',
            ],400);
        }
    }
}
