import React from 'react'
import { MdAdfScanner } from "react-icons/md";
import { CiMap } from "react-icons/ci";
import { BsBookshelf } from "react-icons/bs";
import { TiDropbox } from "react-icons/ti";
import { IoIosDocument } from "react-icons/io";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import logo from "@/app/assets/LogoRM.png"

const ICON_SIZE = 22

export const SideBarComponent = ({ collapsed, toggled, setToggled }: any) => {
  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: '#2499c7',
        },
      }}
      breakPoint='md'
      onBreakPoint={(broken) => { }}
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => { setToggled() }}
      className='drop-shadow-xl'
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                color: 'white',
                backgroundColor: active ? '#ffbd0c' : undefined,
                ['&:hover']: {
                  backgroundColor: '#dee2e6',
                  color: '#212529',
                  fontWeight: 'bold',
                }
              };
          },
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '30px', marginBottom: '30px' }}>
          <img className='w-10 ml-2' src={logo.src} alt='logo' />
        </div>
        <SubMenu label="Escaner" icon={<MdAdfScanner size={ICON_SIZE} />}>
          <MenuItem component={<a href={"dashboard"} />} icon={<MdAdfScanner size={ICON_SIZE} />}>Escaner</MenuItem>
        </SubMenu>
        <SubMenu label="Estantes" icon={<BsBookshelf size={ICON_SIZE} />}>
          <MenuItem component={<a href={"estantes"} />} icon={<BsBookshelf size={ICON_SIZE} />}>Estantes</MenuItem>
        </SubMenu>
        <SubMenu label="Cajas" icon={<TiDropbox size={ICON_SIZE} />}>
          <MenuItem component={<a href={"cajas"} />} icon={<TiDropbox size={ICON_SIZE} />}>Cajas</MenuItem>
        </SubMenu>
        <SubMenu label="Expedientes" icon={<IoIosDocument size={ICON_SIZE} />}>
          <MenuItem component={<a href={"expedientes"} />} icon={<IoIosDocument size={ICON_SIZE} />}>Expedientes</MenuItem>
        </SubMenu>
        <SubMenu label="Mapa 2D" icon={<CiMap size={ICON_SIZE} />}>
          <MenuItem component={<a href={"mapaEstantes"} />} icon={<CiMap size={ICON_SIZE} />}>Mapa 2D</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  )
}