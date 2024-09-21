/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import { TbBeach } from "react-icons/tb";
import { IoColorPaletteOutline } from "react-icons/io5";
import classNames from "classnames";

export default function Header(props) {
  return (
    <header
      className={classNames({
        [styles.headerDark]: props.temaEscuro,
        [styles.headerLight]: !props.temaEscuro,
        [styles.container_header]: true,
      })}
    >
      <Link to={"/"} className={styles.link}>
        <h1>STAYcation</h1>
        <TbBeach
          fontSize="1.9em"
          color={props.temaEscuro ? "#b7ebd4" : "black"}
        />
      </Link>
      <button onClick={props.trocarTema}>
        MUDAR TEMA <IoColorPaletteOutline />
      </button>
    </header>
  );
}
