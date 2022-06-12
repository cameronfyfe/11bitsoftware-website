{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs";
  };

  outputs = inputs @ { self, ... }:
    (inputs.flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import inputs.nixpkgs {
          inherit system;
        };

      in
      rec {

        devShell = pkgs.mkShell {
          nativeBuildInputs =
            with pkgs; [ just nodejs-16_x ];
        };

        packages = { dev = devShell; };

      }));
}
