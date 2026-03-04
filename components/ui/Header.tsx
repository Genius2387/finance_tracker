import { Navigation } from "@/components/ui/Navigation";
import { HeaderLogo } from "@/components/ui/Header-logo";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { WelcomeMsg } from "@/components/ui/Welcome-msg";
import { Filters } from "./filters";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">

        {/* Top navbar */}
        <div className="w-full flex items-center justify-between mb-14">

          <div className="flex items-center lg:gap-4">
            <HeaderLogo />
            <Navigation />
          </div>

          <ClerkLoaded>
            <div className="flex items-center gap-3">

              {/* When user is NOT logged in */}
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-none">
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>

              {/* When user IS logged in */}
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

            </div>
          </ClerkLoaded>

          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400" />
          </ClerkLoading>

        </div>

        {/* Welcome text */}
        <WelcomeMsg />

        {/* Filters */}
        <Filters />

      </div>
    </header>
  );
};