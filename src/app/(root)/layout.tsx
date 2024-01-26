import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Metadata } from "next";

export const metadata:Metadata={
  title:"Eventsphere",
  description:"Craft unforgettable events effortlessly with EventSphere.",
  icons:{
    icon:'https://res.cloudinary.com/dpxuxtdbh/image/upload/v1706190615/private/favicon_u9tf4h.ico'
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-1">{children}</main> 
          <Footer />
        </div>
      </body>
    </html>
  );
}