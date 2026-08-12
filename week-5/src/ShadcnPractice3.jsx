import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import {Menu} from "@/components/ui/menubar"
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

function ShadcnPractice() {
  return (
    <div className="p-6">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>Share</MenubarItem>
              <MenubarItem>Print</MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Input placeholder="Enter your name" />

      <Button className="mt-4">Submit</Button>
    </div>
  );
}

export default ShadcnPractice;
