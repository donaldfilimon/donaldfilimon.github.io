import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandEmpty,
} from "sites-project";

const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
};

const shell = {
  width: 360,
  height: 320,
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  boxShadow: "0 8px 24px rgba(20, 22, 27, 0.08)",
  overflow: "hidden",
};

export const NavigationPalette = () => (
  <div style={paper}>
    <div style={shell}>
      <Command>
        <CommandInput placeholder="Jump to a page or action..." />
        <CommandList>
          <CommandGroup heading="Navigate">
            <CommandItem>
              <span aria-hidden="true">→</span>
              Work
              <CommandShortcut>⌘1</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span aria-hidden="true">→</span>
              Services
              <CommandShortcut>⌘2</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span aria-hidden="true">→</span>
              About
              <CommandShortcut>⌘3</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span aria-hidden="true">→</span>
              Contact
              <CommandShortcut>⌘4</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>
              <span aria-hidden="true">✉</span>
              Email cbkshadow@icloud.com
            </CommandItem>
            <CommandItem>
              <span aria-hidden="true">↗</span>
              Open GitHub profile
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  </div>
);

export const EmptyResult = () => (
  <div style={paper}>
    <div style={shell}>
      <Command>
        <CommandInput placeholder="mixed-reality-audit" />
        <CommandList>
          <CommandEmpty>No pages or projects match that search.</CommandEmpty>
        </CommandList>
      </Command>
    </div>
  </div>
);
