import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] border-t-[3px] border-white mb-[90px] mt-auto">
      <div className="py-4 px-4 text-center text-xs">
        {/* Links row */}
        <div className="mb-2">
          <Link href="/" className="text-[#005CB9] hover:underline">Home</Link>
          <span className="mx-1">|</span>
          <Link href="/contact" className="text-[#005CB9] hover:underline">Send Feedback</Link>
          <span className="mx-1">|</span>
          <Link href="/contact" className="text-[#005CB9] hover:underline">Having a problem?</Link>
          <span className="mx-1">|</span>
          <Link href="/contact" className="text-[#005CB9] hover:underline">Suggest a Word</Link>
          <span className="mx-1">|</span>
          <Link href="/privacy" className="text-[#005CB9] hover:underline">Privacy Policy</Link>
          <span className="mx-1">|</span>
          <Link href="/about" className="text-[#005CB9] hover:underline">Accessibility Roadmap</Link>
        </div>

        {/* Social icons row */}
        <div className="flex justify-center gap-3 mb-2">
          <span className="text-sm" title="Facebook">f</span>
          <span className="text-sm" title="YouTube">▶</span>
          <span className="text-sm" title="Instagram">📷</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-600">&copy;2025 Wordsmyth</p>
      </div>
    </footer>
  );
}
