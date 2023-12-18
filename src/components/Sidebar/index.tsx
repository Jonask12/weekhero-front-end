import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { LiaProductHunt } from "react-icons/lia";
import { BiExit } from "react-icons/bi";
import { IconType } from "react-icons";
import React from "react";
import { useAuth } from "../../hooks/auth";

interface CollumAtributes {
  name: string;
  router: string;
  icon: IconType;
}

export function Sidebar() {
  const pages: Array<CollumAtributes> = [
    { router: "schedules", name: "Angendamento", icon: AiOutlineSchedule },
    { router: "edit-profile", name: "Editar perfil", icon: AiOutlineEdit },
    { router: "products", name: "Produtos", icon: LiaProductHunt },
    { router: "", name: "Sair", icon: BiExit },
  ];

  const { signOut } = useAuth();

  return (
    <div className="bg-primary-500 w-[280px] h-full">
      <nav className="flex flex-col">
        {pages.map(({ name, router, icon }) => {
          if (name === 'sair') {
            signOut()
          }
          return (
            <ul key={router}>
              <Link className="flex items-center gap-2 p-3 hover:bg-teal-500" to={`/${router}`}>
                {icon &&
                  React.createElement(icon, {
                    style: { fontSize: "1.5rem", color: "white" },
                  })}
                <li className="p-2 hover:rounded-md text-white-500">
                  {name}
                </li>
              </Link>
            </ul>
          );
        })}
      </nav>
    </div>
  );
}


