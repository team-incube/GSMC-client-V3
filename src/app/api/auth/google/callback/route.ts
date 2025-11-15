import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { AuthTokenResponse } from "@/feature/google-auth/model/AuthResponse";

export async function POST(request: NextRequest) {
  try {

    // 요청 바디에서 authorization code 추출
    const { code } = await request.json();

    console.log("Google Authorization Code:", code);

    const decodedCode = decodeURIComponent(code);

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code가 없습니다" },
        { status: 400 }
      );
    }

    // 백엔드 API 호출 - 디코딩된 code 전송
    const response = await axios.post<AuthTokenResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { code: decodedCode });

    if (response.status !== 200) {
      return NextResponse.json(
        {
          error: "백엔드 인증 실패",
          details: response.data,
        },
        { status: response.status }
      );
    }

    // 토큰과 역할 추출
    const { accessToken, refreshToken, role } = response.data;

    // 토큰이 없으면 오류 반환
    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: "토큰을 받지 못했습니다" },
        { status: 500 }
      );
    }

    console.log("ROLE:", role);

    // 
    const res = NextResponse.json(
      { 
        success: true,
        needsSignup: role === "UNAUTHORIZED"
      },
      { status: 200 }
    );

    // 쿠키에 토큰 저장
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    // 쿠키에 refreshToken도 저장
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    // ✅ role도 쿠키에 저장 (middleware에서 체크용), 나중에 사용자 정보 호출 API로 변경 예정
    res.cookies.set("userRole", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    // 네트워크 또는 기타 오류 처리
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    // 일반 오류 로그
    return NextResponse.json(
      { error: "인증 처리 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}