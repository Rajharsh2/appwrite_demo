import {NextResponse, NextRequest} from 'next/server';
import {account} from './appwrite/config';

/**
 * Middleware function to protect routes by verifying the presence of an access token in cookies.
 *
 * @function
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} A response object that either continues the request or redirects to the login page.
 */
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isTodosPath = path.startsWith('/todo');
  // console.log('Printing path from middleware', isTodosPath);
  // console.log(request.cookies.getAll());
  // console.log(
  //   'Prinitng Cookies',
  //   request.cookies.get('a_session_668e55e1000b33e0e307_legacy'),
  // );

  if (isTodosPath) {
    // const user = await account.get();
    const token =
      request.cookies.get('a_session_668e55e1000b33e0e307_legacy')?.value || '';
    // console.log('Printing token', token);

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/todo','/todo/event'],
};
