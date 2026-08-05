import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { User2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {

    const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Navigation + Avatar */}
        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-5 font-medium">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Jobs</li>
            <li className="cursor-pointer">Browse</li>
          </ul>

         { !user?(
            <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="outline" className="px-5 py-5">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] px-6 py-5">Signup</Button></Link>
            </div>
          ):(

          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-80">
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-medium">Renu Sharma</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 text-gray-600">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <User2 className="h-4 w-4" />
                    <Button
                      variant="link"
                      className="p-0 h-auto text-gray-600"
                    >
                      View Profile
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    <Button
                      variant="link"
                      className="p-0 h-auto text-gray-600"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;