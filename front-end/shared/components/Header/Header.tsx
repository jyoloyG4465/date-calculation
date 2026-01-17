"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface MenuItem {
  label: string;
  to: string;
}

const defaultMenuItems: MenuItem[] = [
  { label: "ホーム", to: "/" },
  { label: "日数差計算", to: "/date-calculation" },
  { label: "N日後計算", to: "/date-after-days" },
  { label: "お問い合わせ", to: "/contact" },
];

interface HeaderProps {
  menuItems?: MenuItem[];
}

const BREAKPOINT = 700;

export function Header({ menuItems = defaultMenuItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const getNavLinkStyle = (isActive: boolean) => ({
    color: isActive ? "#fff" : "rgba(255, 255, 255, 0.9)",
    backgroundColor: isActive ? "rgba(255, 255, 255, 0.25)" : "transparent",
    fontSize: "14px",
    fontWeight: 500,
    textTransform: "none" as const,
    borderRadius: "6px",
    padding: "8px 16px",
    textDecoration: "none",
    display: "inline-block",
    transition: "background-color 0.2s",
  });

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(135deg, #444444 0%, #444444 50%, #444444 100%)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "flex-start",
          gap: "36px",
          minHeight: 48,
          [`@media (min-width: ${BREAKPOINT}px)`]: {
            minHeight: 56,
          },
          px: 2,
        }}
      >
        <Box
          component="span"
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.5px",
          }}
        >
          date-calculation
        </Box>

        {/* Desktop Navigation */}
        <Box
          component="nav"
          sx={{
            display: "none",
            [`@media (min-width: ${BREAKPOINT}px)`]: {
              display: "flex",
            },
            gap: 1,
          }}
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.label}
                href={item.to}
                style={getNavLinkStyle(isActive)}
              >
                {item.label}
              </Link>
            );
          })}
        </Box>

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Hamburger Button (Mobile) */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          onClick={toggleMenu}
          sx={{
            display: "flex",
            [`@media (min-width: ${BREAKPOINT}px)`]: {
              display: "none",
            },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
          }}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={closeMenu}
        sx={{
          [`@media (min-width: ${BREAKPOINT}px)`]: {
            display: "none",
          },
          "& .MuiDrawer-paper": {
            top: 48,
            background: "linear-gradient(135deg, #333333 0%, #444444 100%)",
          },
        }}
      >
        <List sx={{ py: 1 }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.to}
                  onClick={closeMenu}
                  sx={{
                    mx: 2,
                    my: 0.5,
                    borderRadius: "6px",
                    backgroundColor: isActive
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: isActive ? "#fff" : "rgba(255, 255, 255, 0.9)",
                        fontWeight: 500,
                        fontSize: "16px",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </AppBar>
  );
}
