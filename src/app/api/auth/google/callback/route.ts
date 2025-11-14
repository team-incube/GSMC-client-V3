import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    console.log("받은 authorization code (URL 인코딩):", code);
    
    // URL 디코딩
    const decodedCode = decodeURIComponent(code);
    console.log("디코딩된 authorization code:", decodedCode);

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code가 없습니다" },
        { status: 400 }
      );
    }

    // 백엔드 API 호출 - 디코딩된 code 전송
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth`,
      { code: decodedCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      }
    );

    console.log("백엔드 응답:", {
      status: response.status,
      data: response.data,
    });

    if (response.status !== 200) {
      return NextResponse.json(
        {
          error: "백엔드 인증 실패",
          details: response.data,
        },
        { status: response.status }
      );
    }

    // API 명세에 따라 response.data.data에서 토큰 추출
    const { accessToken, refreshToken, role } = response.data.data;

    if (!accessToken || !refreshToken) {
      console.error("토큰 없음:", response.data);
      return NextResponse.json(
        { error: "토큰을 받지 못했습니다" },
        { status: 500 }
      );
    }

    console.log("토큰 받음, role:", role);

    const res = NextResponse.json(
      { 
        success: true,
        needsSignup: role === "UNAUTHORIZED"
      },
      { status: 200 }
    );

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    console.error("Google OAuth callback error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    return NextResponse.json(
      { error: "인증 처리 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}