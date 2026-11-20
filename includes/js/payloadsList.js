var payloadsPath = "./includes/payloads/Bins/";
var homebrewPath = "./includes/payloads/Homebrew/";

var payloadsList = [
  {
    id: "PS4DebugNG",
    name: "PS4Debug-NG",
    author: "golden, Pharaoh2k",
    description: "Next-Gen version of ps4debug for PlayStation 4",
    specificFW: "5.05 - latest",
    category: "advanced",
    src: payloadsPath + "ps4debug-ng_v1.3.4.bin"
  },
  {
    id: "PUPDecrypt",
    name: "PUP Decrypt",
    author: "andy-man",
    description: "Payload to decrypt the contents of a firmware update file (PUP) on the PS4",
    specificFW: "4.73 - latest",
    category: "advanced",
    src: payloadsPath + "ps4-pup-decrypt.bin"
  },
  {
    id: "ModuleDumper",
    name: "Module Dumper",
    author: "SocraticBliss",
    description: "Dumps the decrypted modules from /system, /system_ex, /update and the root of the filesystem to a USB device.",
    specificFW: "4.73 - latest",
    category: "advanced",
    src: payloadsPath + "ps4-module-dumper.bin"
  },
  {
    id: "KernelDumper",
    name: "Kernel Dumper",
    author: "Eversion",
    description: "Dumps the PS4 kernel.",
    specificFW: "4.73 - latest",
    category: "advanced",
    src: payloadsPath + "ps4-kernel-dumper.bin"
  },
  {
    id: "DisableASLR",
    name: "Disable ASLR",
    author: "Scene Collective",
    description: "Disables the ASLR (Address space layout randomization) to make working with memory easier/repeatable.",
    specificFW: "4.73 - latest",
    category: "advanced",
    src: payloadsPath + "ps4-disable-aslr.bin"
  },
  {
    id: "PermanentUART",
    name: "Permanent UART",
    author: "JTAG7371",
    description: "Enabled hardware based UART without a kernel patch, persists though updates.",
    specificFW: "4.73 - latest",
    category: "advanced",
    src: payloadsPath + "ps4-permanent-uart.bin"
  },
  {
    id: "RIFRenamer",
    name: "RIF Renamer",
    author: "Al Azif",
    description: "Renames 'fake' RIFs to 'free' RIFs for better HEN compatibility. Use this if your PKGs only work with Mira+HEN.",
    specificFW: "4.73 - latest",
    category: "advanced",
    src: payloadsPath + "ps4-rif-renamer.bin"
  },
  {
    id: "PSVue",
    name: "PlayStation Vue v1.24",
    author: "Sorny",
    description: "For setting up PlayStation Vue exploit. <br>You need an internet connection to use this payload.<br><strong>This does NOT install and setup download0 nor the save file!</strong>",
    specificFW: "4.73 - latest",
    category: "homebrew",
    src: homebrewPath + "PlayStationVue-base-installer.bin",
    needsPayloadLoader: true
  },
  {
    id: "OnlineStoreInstall",
    name: "Homebrew Store",
    author: "LightningMods",
    description: "Online Installer for the PS4 Homebrew Store.<br>You need an internet connection to use this payload.",
    specificFW: "4.73 - latest",
    category: "homebrew",
    src: homebrewPath + "online-store-installer.bin",
    needsPayloadLoader: true
  },
  {
    id: "ApolloSaveTool",
    name: "Apollo Save Tool",
    author: "Bucanero",
    description: "Apollo Save Tool is an application to manage save-game files on the PlayStation 4.<br>You need an internet connection to use this payload.",
    specificFW: "4.73 - latest",
    category: "homebrew",
    src: homebrewPath + "ApolloSaveToolv232.bin",
    needsPayloadLoader: true
  },
  {
    id: "Itemzflow",
    name: "Itemzflow Installer",
    author: "LightningMods",
    description: "Itemzflow is a Free and Open source PS4 home menu alternative Itemzflow expands the beyond limits of Sony's ShellUI.<br>You need an internet connection to use this payload.",
    specificFW: "4.73 - latest",
    category: "homebrew",
    src: homebrewPath + "PS4-Itemzflow-v108.bin",
    needsPayloadLoader: true
  },
  {
    id: "PS4Xplorer2.10",
    name: "File Xplorer 2.0",
    author: "Lapy",
    description: "A File Manager for the PlayStation 4 console.<br>You need an internet connection to use this payload.",
    specificFW: "4.73 - latest",
    category: "homebrew",
    src: homebrewPath + "PS4-Xplorer-210.bin",
    needsPayloadLoader: true
  }
];
