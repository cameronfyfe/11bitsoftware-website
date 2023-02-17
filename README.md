# 11 Bit Software Website

https://11bit.io

# Development

Development environment is specified in `flake.nix`.

To enter development shell:

    nix develop

# Makefile
```bash
make build           # Build static site for production
make                 # Same as `make build`
make start           # Launch site in development mode
make fmt             # Format code with prettier
make lint            # Lint code with eslint
make svelte-check    # Run svelte-check
make ci-build        # Run all CI checks
make bundle-analyzer # Open bundle analyzer
make ipfs-deploy     # Deploy to ipfs
make ipfs-view       # Deploy to ipfs and open in browser
make clean           # Clean build files
```
