import { useState, useCallback } from "react";
import { NavLink } from "react-router";
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
  { label: "日数計算", to: "/date-calculation" },
  { label: "N日後計算", to: "/date-after-days" },
];

interface HeaderProps {
  menuItems?: MenuItem[];
}

export function Header({ menuItems = defaultMenuItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "flex-start",
          gap: "48px",
          minHeight: { xs: 48, sm: 56 },
          px: 2,
        }}
      >
        <Box
          component="span"
          sx={{
            fontSize: { xs: "16px", sm: "20px" },
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
            display: { xs: "none", sm: "flex" },
            gap: 1,
          }}
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              style={({ isActive }) => getNavLinkStyle(isActive)}
              end
            >
              {item.label}
            </NavLink>
          ))}
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
            display: { xs: "flex", sm: "none" },
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
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            top: 48,
            background: "linear-gradient(135deg, #047857 0%, #059669 100%)",
          },
        }}
      >
        <List sx={{ py: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.to}
                end
                onClick={closeMenu}
                sx={{
                  mx: 2,
                  my: 0.5,
                  borderRadius: "6px",
                  "&.active": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: "rgba(255, 255, 255, 0.9)",
                      fontWeight: 500,
                      fontSize: "16px",
                    },
                    ".active &": {
                      "& .MuiListItemText-primary": {
                        color: "#fff",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
