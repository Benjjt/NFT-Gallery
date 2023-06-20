import "./globals.css";
import { FilterButtonContext } from "./Context/store";

export const metadata = {
  title: "NFT Project Viewer",
  description: "An app for viewing and filtering NFT projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FilterButtonContext> {children}</FilterButtonContext>
      </body>
    </html>
  );
}
