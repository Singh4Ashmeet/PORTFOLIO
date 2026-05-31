"""
Quick-start script for the Ashmeet Portfolio website.

Usage:
    python start.py             -> install deps if needed, then start dev server
    python start.py --build     -> build for production, then serve
    python start.py --no-clean  -> skip .next cache cleanup
    python start.py --port 3001 -> request a starting port
"""

from __future__ import annotations

import argparse
import os
import shutil
import socket
import subprocess
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent
NODE_MODULES = ROOT_DIR / "node_modules"
NEXT_CACHE = ROOT_DIR / ".next"
PACKAGE_JSON = ROOT_DIR / "package.json"
PACKAGE_LOCK = ROOT_DIR / "package-lock.json"
NODE_MODULES_LOCK = NODE_MODULES / ".package-lock.json"
HOST = "127.0.0.1"
DEFAULT_PORT = 3000


def resolve_tool(name: str) -> str:
    path = shutil.which(name)
    if path is None:
        print(f"ERROR: '{name}' was not found. Install Node.js from https://nodejs.org")
        sys.exit(1)
    return path


NPM = resolve_tool("npm")


def run(command: list[str]) -> None:
    subprocess.check_call(command, cwd=ROOT_DIR)


def check_node() -> None:
    node = resolve_tool("node")
    version = subprocess.check_output([node, "--version"], text=True).strip()
    print(f"Node.js {version} detected")


def dependencies_are_current() -> bool:
    if not NODE_MODULES.is_dir() or not (NODE_MODULES / "lenis").is_dir():
        return False

    if not NODE_MODULES_LOCK.exists():
        return False

    newest_manifest = max(
        path.stat().st_mtime
        for path in (PACKAGE_JSON, PACKAGE_LOCK)
        if path.exists()
    )
    return NODE_MODULES_LOCK.stat().st_mtime >= newest_manifest


def install_dependencies() -> None:
    if dependencies_are_current():
        print("Dependencies are current")
        return

    print("Installing dependencies with npm install...")
    run([NPM, "install"])
    print("Dependencies installed")


def clean_next_cache() -> None:
    if NEXT_CACHE.is_dir():
        print("Cleaning .next cache...")
        shutil.rmtree(NEXT_CACHE, ignore_errors=True)
        print("Cache cleared")
    else:
        print("No .next cache to clean")


def find_free_port(start: int) -> int:
    for port in range(start, start + 100):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(0.2)
            if sock.connect_ex((HOST, port)) != 0:
                return port
    raise RuntimeError(f"No free port found from {start} to {start + 99}")


def start_dev(start_port: int) -> None:
    port = find_free_port(start_port)
    print(f"\nStarting Next.js dev server at http://{HOST}:{port}\n")
    try:
        run([NPM, "run", "dev", "--", "--hostname", HOST, "--port", str(port)])
    except KeyboardInterrupt:
        print("\nDev server stopped.")


def build_and_serve(start_port: int) -> None:
    print("\nBuilding production bundle...\n")
    run([NPM, "run", "build"])

    port = find_free_port(start_port)
    print(f"\nStarting production server at http://{HOST}:{port}\n")
    try:
        run([NPM, "run", "start", "--", "--hostname", HOST, "--port", str(port)])
    except KeyboardInterrupt:
        print("\nServer stopped.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the Ashmeet Portfolio website.")
    parser.add_argument("--build", action="store_true", help="Build and serve production output.")
    parser.add_argument("--no-clean", action="store_true", help="Skip .next cache cleanup.")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="Starting port to try.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    os.chdir(ROOT_DIR)
    check_node()
    install_dependencies()

    if not args.no_clean:
        clean_next_cache()

    if args.build:
        build_and_serve(args.port)
    else:
        start_dev(args.port)


if __name__ == "__main__":
    main()
