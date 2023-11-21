import {useState, Fragment} from 'react';
import {Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemText, ListItemIcon} from '@mui/material';
import { Skateboarding as SkateboardingIcon, Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function SideNav() {

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const anchor = 'right'
  const pathname = usePathname();

  const list = () => (
    <Box
      role="presentation"
      onClick={()=>setToggleDrawer(false)}
      onKeyDown={()=>setToggleDrawer(false)}
    >
      <List>
        {['Artists', 'Blog', 'Podcast', 'Cities', 'Home'].map((text, index) => {
            return(
            <ListItem key={text} disablePadding>
                <ListItemButton>
                    <Link className={clsx("flex", {'bg-sky-100 text-blue-600': pathname === `/${text.toLowerCase()}`})} key={index} href={text === 'Home' ? '/' :`${text.toLowerCase()}`}>
                        <ListItemIcon>
                            <SkateboardingIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </Link>
                </ListItemButton>
            </ListItem>
        )})}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
        <Fragment key={anchor}>
          <MenuIcon onClick={()=>setToggleDrawer(!toggleDrawer)}/>
          <Drawer
            anchor={anchor}
            open={toggleDrawer}
            onClose={()=>setToggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </Fragment>
    </div>
  );
}