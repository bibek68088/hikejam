import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hikejam",
  description: "Hikejam is a platform for sharing hiking experiences and tips.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
