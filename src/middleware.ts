import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes:[
        '/',
        '/api/events/:id',
        '/api/webhook/clerk',
        '/api/webhook/paystack',
        '/api/uploadthing'
    ],
    ignoredRoutes:[
      '/api/webhook/clerk',
      '/api/webhook/paystack',
      '/api/uploadthing',
      '/api/events'
    ]
 
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};