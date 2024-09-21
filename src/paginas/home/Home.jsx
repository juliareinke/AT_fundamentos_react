/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "react-responsive-modal";
import { useState, useEffect } from "react";

import { nanoid } from "nanoid";

import Header from "../../componentes/header/Header";
import Produto from "../../componentes/produto/Produto";

import styles from "./styles.module.css";
import "./custom-styling.css";
import "react-responsive-modal/styles.css";
import classNames from "classnames";
import Footer from "../../componentes/footer/footer";

export default function Home() {
  const [open, setOpen] = useState(false);

  const [hotel, setHotel] = useState([]);

  const [formDados, setFormDados] = useState({
    id: "",
    nome: "",
    imgMain: "",
    img2: "",
    img3: "",
    img4: "",
    estrelas: "",
    cidade: "",
    estado: "",
    diaria: "",
    descricaoCompleta: "",
    descricaoDetalhada: "",
  });

  const [validarErros, setValidarErros] = useState({
    id: "",
    nome: "",
    imgMain: "",
    img2: "",
    img3: "",
    img4: "",
    estrelas: "",
    cidade: "",
    estado: "",
    diaria: "",
    descricaoCompleta: "",
    descricaoDetalhada: "",
  });

  const [favorito, setFavorito] = useState([]);

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");

  const [temaEscuro, setTemaEscuro] = useState(() => {
    const temaSalvo = localStorage.getItem("@tema");
    return temaSalvo === "escuro";
  });

  function validarFormulario() {
    let vazio = "*Campo Obrigatório";
    let estrelas = "*Número de estrelas deve ser entre 1 e 5!";
    let negativo = "*O valor não pode ser um número negativo!";

    let erros = {
      nome: "",
      imgMain: "",
      estrelas: "",
      cidade: "",
      estado: "",
      diaria: "",
      descricaoCompleta: "",
      descricaoDetalhada: "",
    };

    if (formDados.nome === "") {
      erros.nome = vazio;
    }
    if (formDados.imgMain === "") {
      erros.imgMain = vazio;
    }
    if (formDados.estrelas === "") {
      erros.estrelas = vazio;
    } else if (formDados.estrelas < 1 || formDados.estrelas > 5) {
      erros.estrelas = estrelas;
    }
    if (formDados.cidade === "") {
      erros.cidade = vazio;
    }
    if (formDados.estado === "") {
      erros.estado = vazio;
    }
    if (formDados.diaria === "") {
      erros.diaria = vazio;
    } else if (parseFloat(formDados.diaria) < 0) {
      erros.diaria = negativo;
    }
    if (formDados.descricaoCompleta === "") {
      erros.descricaoCompleta = vazio;
    }
    if (formDados.descricaoDetalhada === "") {
      erros.descricaoDetalhada = vazio;
    }

    setValidarErros(erros);
    return erros;
  }

  function carregarHoteis() {
    const hoteisArmazenados = localStorage.getItem("@hotel");

    if (hoteisArmazenados) {
      const hoteis = JSON.parse(hoteisArmazenados);
      setHotel(hoteis);
    }
  }

  useEffect(() => {
    carregarHoteis();
  }, []);

  function criarHotel() {
    const errosForm = validarFormulario();

    if (
      errosForm.nome === "" &&
      errosForm.imgMain === "" &&
      errosForm.estrelas === "" &&
      errosForm.cidade === "" &&
      errosForm.estado === "" &&
      errosForm.diaria === "" &&
      errosForm.descricaoCompleta === "" &&
      errosForm.descricaoDetalhada === ""
    ) {
      const idHotel = nanoid();

      try {
        setHotel([
          ...hotel,
          {
            id: idHotel,
            nome: formDados.nome,
            imgMain: formDados.imgMain,
            img2: formDados.img2,
            img3: formDados.img3,
            img4: formDados.img4,
            estrelas: formDados.estrelas,
            cidade: formDados.cidade,
            estado: formDados.estado,
            diaria: formDados.diaria,
            descricaoCompleta: formDados.descricaoCompleta,
            descricaoDetalhada: formDados.descricaoDetalhada,
          },
        ]);

        localStorage.setItem(
          "@hotel",
          JSON.stringify([
            ...hotel,
            {
              id: idHotel,
              nome: formDados.nome,
              imgMain: formDados.imgMain,
              img2: formDados.img2,
              img3: formDados.img3,
              img4: formDados.img4,
              estrelas: formDados.estrelas,
              cidade: formDados.cidade,
              estado: formDados.estado,
              diaria: formDados.diaria,
              descricaoCompleta: formDados.descricaoCompleta,
              descricaoDetalhada: formDados.descricaoDetalhada,
            },
          ])
        );
        alert("Salvo com sucesso!");
      } catch (error) {
        alert(
          "Falha ao criar novo hotel no local storage. Tente novamente mais tarde."
        );
        console.error("Falha ao criar novo hotel no LocalStorage:", error);
      }

      setFormDados({
        id: "",
        nome: "",
        imgMain: "",
        img2: "",
        img3: "",
        img4: "",
        estrelas: "",
        cidade: "",
        estado: "",
        diaria: "",
        descricaoCompleta: "",
        descricaoDetalhada: "",
      });

      setOpen(false);
    } else {
      return;
    }
  }

  function cancelarFormulario() {
    setFormDados({
      id: "",
      nome: "",
      imgMain: "",
      img2: "",
      img3: "",
      img4: "",
      estrelas: "",
      cidade: "",
      estado: "",
      diaria: "",
      descricaoCompleta: "",
      descricaoDetalhada: "",
    });

    setValidarErros({
      id: "",
      nome: "",
      imgMain: "",
      img2: "",
      img3: "",
      img4: "",
      estrelas: "",
      cidade: "",
      estado: "",
      diaria: "",
      descricaoCompleta: "",
      descricaoDetalhada: "",
    });

    setOpen(false);
  }

  function favoritadoId(id) {
    const hotelFavoritado = hotel.find((hotel) => hotel.id === id);

    if (
      favorito.length > 0 &&
      favorito.find((fav) => fav.id === hotelFavoritado.id)
    ) {
      const removerFav = favorito.filter(
        (fav) => fav.id !== hotelFavoritado.id
      );
      setFavorito(removerFav);
    } else {
      setFavorito([...favorito, hotelFavoritado]);
    }
  }

  function pesquisar() {
    if (busca !== "") {
      const pesquisa = hotel.filter((nomeHotel) =>
        nomeHotel.nome.toLowerCase().startsWith(busca.toLowerCase())
      );
      setHotel([...pesquisa]);
    } else {
      carregarHoteis();
    }
  }

  useEffect(() => {
    pesquisar();
  }, [busca]);

  function filtrar() {
    let hotelFiltrar = [...hotel];

    if (filtro === "maiorValor") {
      hotelFiltrar.sort((a, b) => b.diaria - a.diaria);
      setHotel([...hotelFiltrar]);
      return;
    } else if (filtro === "menorValor") {
      hotelFiltrar.sort((a, b) => a.diaria - b.diaria);
      setHotel([...hotelFiltrar]);
      return;
    } else if (filtro === "maiorEstrelas") {
      hotelFiltrar.sort((a, b) => b.estrelas - a.estrelas);
      setHotel([...hotelFiltrar]);
      return;
    } else if (filtro === "menorEstrelas") {
      hotelFiltrar.sort((a, b) => a.estrelas - b.estrelas);
      setHotel([...hotelFiltrar]);
      return;
    } else {
      carregarHoteis();
    }
  }

  useEffect(() => {
    filtrar();
  }, [filtro]);

  function trocarTema() {
    const outroTema = !temaEscuro;
    setTemaEscuro(outroTema);
    localStorage.setItem("@tema", outroTema ? "escuro" : "claro");
  }

  const closeIcon = (
    <svg fill="#3b9e68" viewBox="0 0 20 20" width={28} height={28}>
      <path d="M4.293 5.293a1 1 0 011.414 0L10 9.586l4.293-4.293a1 1 0 111.414 1.414L11.414 11l4.293 4.293a1 1 0 01-1.414 1.414L10 12.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 11 4.293 6.707a1 1 0 010-1.414z" />
    </svg>
  );

  return (
    <div
      className={classNames({
        [styles.dark]: temaEscuro,
        [styles.light]: !temaEscuro,
        [styles.home]: true,
      })}
    >
      <Header trocarTema={trocarTema} temaEscuro={temaEscuro} />
      <div className={styles.container_home}>
        <h2>Hotéis</h2>
        <div className={styles.filtros}>
          <input
            placeholder="Pesquise hotéis por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          ></input>
          <select onChange={(e) => setFiltro(e.target.value)} value={filtro}>
            <option value="">Filtrar por</option>
            <option value="maiorValor">Maior valor diária</option>
            <option value="menorValor">Menor valor diária</option>
            <option value="maiorEstrelas">Maior classificação</option>
            <option value="menorEstrelas">Menor classificação</option>
          </select>
        </div>

        <div className={styles.container_lista}>
          {hotel.map((h) => (
            <Produto
              key={h.id}
              produto={h}
              temaEscuro={temaEscuro}
              trocarTema={trocarTema}
              favoritadoId={favoritadoId}
              isFavorito={favorito.some((fav) => fav.id === h.id)}
            />
          ))}
        </div>
      </div>

      <div className={styles.container_home}>
        <h2>Favoritos</h2>

        <div className={styles.container_lista}>
          {favorito.map((fav) => (
            <Produto
              key={fav.id}
              produto={fav}
              temaEscuro={temaEscuro}
              trocarTema={trocarTema}
              favoritadoId={favoritadoId}
              isFavorito={true}
            />
          ))}
        </div>
      </div>

      <button className={styles.botao_add} onClick={() => setOpen(true)}>
        +
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          modal: "customModal",
        }}
        closeIcon={closeIcon}
      >
        <div
          className={classNames({
            [styles.dark]: temaEscuro,
            [styles.light]: !temaEscuro,
            [styles.container_formModal]: true,
          })}
        >
          <h3>EDITAR HOTEL</h3>
          <p>Dados principais</p>
          <input
            type="text"
            onChange={(e) =>
              setFormDados({ ...formDados, nome: e.target.value })
            }
            value={formDados.nome}
            placeholder="Nome do Hotel"
          ></input>
          <span>{validarErros.nome}</span>
          <input
            type="number"
            onChange={(e) =>
              setFormDados({ ...formDados, estrelas: e.target.value })
            }
            value={formDados.estrelas}
            placeholder="Classificação em Estrelas"
          ></input>
          <span>{validarErros.estrelas}</span>
          <input
            type="number"
            onChange={(e) =>
              setFormDados({ ...formDados, diaria: e.target.value })
            }
            value={formDados.diaria}
            placeholder="Valor da Diária (ex: 500)"
          ></input>
          <span>{validarErros.diaria}</span>
          <div className={styles.divInterna}>
            <div>
              <input
                type="text"
                onChange={(e) =>
                  setFormDados({ ...formDados, cidade: e.target.value })
                }
                value={formDados.cidade}
                placeholder="Cidade"
              ></input>
              <span>{validarErros.cidade}</span>
            </div>
            <div>
              <input
                type="text"
                onChange={(e) =>
                  setFormDados({ ...formDados, estado: e.target.value })
                }
                value={formDados.estado}
                placeholder="Estado"
              ></input>
              <span>{validarErros.estado}</span>
            </div>
          </div>
          <p>Imagens</p>
          <input
            type="text"
            onChange={(e) =>
              setFormDados({ ...formDados, imgMain: e.target.value })
            }
            value={formDados.imgMain}
            placeholder="URL da Imagem Principal"
          ></input>
          <span>{validarErros.imgMain}</span>
          <input
            type="text"
            onChange={(e) =>
              setFormDados({ ...formDados, img2: e.target.value })
            }
            value={formDados.img2}
            placeholder="URL de Imagem Adicional (opcional)"
          ></input>
          <input
            type="text"
            onChange={(e) =>
              setFormDados({ ...formDados, img3: e.target.value })
            }
            value={formDados.img3}
            placeholder="URL de Imagem Adicional (opcional)"
          ></input>
          <input
            type="text"
            onChange={(e) =>
              setFormDados({ ...formDados, img4: e.target.value })
            }
            value={formDados.img4}
            placeholder="URL de Imagem Adicional (opcional)"
          ></input>
          <p>Descrição</p>
          <textarea
            onChange={(e) =>
              setFormDados({ ...formDados, descricaoCompleta: e.target.value })
            }
            value={formDados.descricaoCompleta}
            placeholder="Descrição completa (ex: 'Localizado próximo a praia, o hotel combina a experiência tropical e luxuosa...')"
          ></textarea>
          <span>{validarErros.descricaoCompleta}</span>
          <textarea
            onChange={(e) =>
              setFormDados({ ...formDados, descricaoDetalhada: e.target.value })
            }
            value={formDados.descricaoDetalhada}
            placeholder="Descrição detalhada dos itens e serviços oferecidos (ex: Acomodações, Gastronomia, Lazer...)"
          ></textarea>
          <span>{validarErros.descricaoDetalhada}</span>
          <div className={styles.divInterna}>
            <button onClick={criarHotel}>Salvar</button>
            <button onClick={cancelarFormulario}>Cancelar</button>
          </div>
        </div>
      </Modal>
      <Footer />
    </div>
  );
}
