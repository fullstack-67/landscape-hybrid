import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  // https://stackoverflow.com/q/70272983

  // Simulate latency - does not work
  // event.waitUntil(
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log("here");
  //       resolve(null);
  //     }, 2000);
  //   })
  // );

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
