const interests = [
  {
    title: "Metal Gear",
    href: "https://store.steampowered.com/app/2131630/",
    type: "Gaming",
  },
  {
    title: "Resident Evil",
    href: "https://store.steampowered.com/curator/34827950",
    type: "Gaming",
  },
  {
    title: "Alan Wake",
    href: "https://store.steampowered.com/app/108710/Alan_Wake/",
    type: "Gaming",
  },
  {
    title: "Ace Combat",
    href: "https://store.steampowered.com/app/502500/ACE_COMBAT_7_SKIES_UNKNOWN/",
    type: "Gaming",
  },
  {
    title: "tmux",
    href: "https://github.com/tmux/tmux/wiki",
    type: "Software",
  },
  {
    title: "EndeavourOS",
    href: "https://endeavouros.com/",
    type: "Software",
  },
  {
    title: "Hyprland",
    href: "https://hyprland.com/",
    type: "Software",
  },
  {
    title: "Alacritty",
    href: "https://alacritty.org/",
    type: "Software",
  },
  {
    title: "Neovim",
    href: "https://neovim.io/",
    type: "Software",
  },
  {
    title: "Visual Studio Code",
    href: "https://code.visualstudio.com/",
    type: "Software",
  },
  {
    title: "sesh",
    href: "https://github.com/joshmedeski/sesh",
    type: "Software",
  },
  {
    title: "shadcn/ui",
    href: "https://ui.shadcn.com/",
    type: "Development",
  },
  {
    title: "Inertia.js",
    href: "https://inertiajs.com/",
    type: "Development",
  },
  {
    title: "ThePrimeagen",
    href: "https://www.twitch.tv/theprimeagen",
    type: "YouTube",
  },
  {
    title: "Chole",
    href: "https://www.youtube.com/@notcole",
    type: "YouTube",
  },
  {
    title: "The Electric Underground",
    href: "https://www.youtube.com/@TheElectricUnderground",
    type: "YouTube",
  },
  {
    title: "Michigan TypeScript",
    href: "https://www.youtube.com/@MichiganTypeScript",
    type: "YouTube",
  },
] as const satisfies { title: string; href: string; type: string }[];

export { interests };
