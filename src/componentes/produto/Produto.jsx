/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

import { CiStar } from "react-icons/ci";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import classNames from "classnames";

export default function Produto(props) {
  return (
    <div
      className={classNames({
        [styles.cardDark]: props.temaEscuro,
        [styles.cardLight]: !props.temaEscuro,
        [styles.container_card]: true,
      })}
    >
      <div className={styles.card_topo}>
        <p>{props.produto.nome}</p>
        <div
          onClick={() => {
            props.favoritadoId(props.produto.id);
          }}
        >
          {props.isFavorito ? (
            <FaHeart color="red" fontSize="1.7em" />
          ) : (
            <FaRegHeart color="red" fontSize="1.7em" />
          )}
        </div>
      </div>
      <Link
        to={`/detalhes/${props.produto.id}?temaEscuro=${props.temaEscuro}`}
        className={classNames({
          [styles.linkDark]: props.temaEscuro,
          [styles.linkLight]: !props.temaEscuro,
          [styles.link]: true,
        })}
      >
        <img src={props.produto.imgMain} />
        <p>
          Classificação:
          {(() => {
            let estrelas = [];
            for (let index = 0; index < props.produto.estrelas; index++) {
              estrelas.push(<CiStar key={index} />);
            }
            return estrelas;
          })()}
        </p>
        <p>
          Localizado em {props.produto.cidade}, {props.produto.estado}
        </p>
        <p>R$ {props.produto.diaria}</p>
      </Link>
    </div>
  );
}
