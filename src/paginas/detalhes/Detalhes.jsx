import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../componentes/header/Header";
import styles from "./styles.module.css";
import "./custom-styling.css";

import { Modal } from "react-responsive-modal";
import { CiStar, CiEdit, CiTrash } from "react-icons/ci";
import classNames from "classnames";
import Footer from "../../componentes/footer/footer";

export default function Detalhes() {
  const [detalhes, setDetalhes] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);
  const [dadosEditados, setDadosEditados] = useState(detalhes);
  const [index, setIndex] = useState("");
  const [hotel, setHotel] = useState([]);

  const [validarErros, setValidarErros] = useState({
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

  const parametros = useParams();
  const id = parametros.id;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const temaEscuro = queryParams.get("temaEscuro") === "true";

  useEffect(() => {
    const carregarHoteis = JSON.parse(localStorage.getItem("@hotel"));
    setHotel(carregarHoteis);
    const buscarHotel = carregarHoteis.find((hotel) => hotel.id === id);
    setDetalhes(buscarHotel);
    const indexHotel = carregarHoteis.findIndex((hotel) => hotel.id === id);
    setIndex(indexHotel);
  }, [id]);

  useEffect(() => {
    setDadosEditados(detalhes);
  }, [openEdit, detalhes]);

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

    if (dadosEditados.nome === "") {
      erros.nome = vazio;
    }
    if (dadosEditados.imgMain === "") {
      erros.imgMain = vazio;
    }
    if (dadosEditados.estrelas === "") {
      erros.estrelas = vazio;
    } else if (dadosEditados.estrelas < 1 || dadosEditados.estrelas > 5) {
      erros.estrelas = estrelas;
    }
    if (dadosEditados.cidade === "") {
      erros.cidade = vazio;
    }
    if (dadosEditados.estado === "") {
      erros.estado = vazio;
    }
    if (dadosEditados.diaria === "") {
      erros.diaria = vazio;
    } else if (parseFloat(dadosEditados.diaria) < 0) {
      erros.diaria = negativo;
    }
    if (dadosEditados.descricaoCompleta === "") {
      erros.descricaoCompleta = vazio;
    }
    if (dadosEditados.descricaoDetalhada === "") {
      erros.descricaoDetalhada = vazio;
    }

    setValidarErros(erros);
    return erros;
  }

  function salvarEdit() {
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
      const edicao = {
        id: id,
        nome: dadosEditados.nome,
        imgMain: dadosEditados.imgMain,
        img2: dadosEditados.img2,
        img3: dadosEditados.img3,
        img4: dadosEditados.img4,
        estrelas: dadosEditados.estrelas,
        cidade: dadosEditados.cidade,
        estado: dadosEditados.estado,
        diaria: dadosEditados.diaria,
        descricaoCompleta: dadosEditados.descricaoCompleta,
        descricaoDetalhada: dadosEditados.descricaoDetalhada,
      };

      const hotelEditado = [...hotel];

      hotelEditado[index] = { ...hotelEditado[index], ...edicao };

      try {
        localStorage.setItem("@hotel", JSON.stringify(hotelEditado));
        setHotel(hotelEditado);
        setDetalhes(edicao);
        alert("Salvo com sucesso!");
      } catch (error) {
        alert(
          "Falha ao salvar edição no local storage. Tente novamente mais tarde."
        );
        console.error("Erro ao salvar edição no LocalStorage:", error);
      }

      setOpenEdit(false);
    } else {
      return;
    }
  }

  function cancelarEdit() {
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

    setOpenEdit(false);
  }

  function excluirItem() {
    const retirar = hotel.filter((excluido, outros) => outros !== index);

    try {
      localStorage.setItem("@hotel", JSON.stringify(retirar));
      setHotel(retirar);
      alert("Hotel excluído com sucesso!");
    } catch (error) {
      alert(
        "Falha ao excluir item do local storage. Tente novamente mais tarde."
      );
      console.error("Erro ao excluir do LocalStorage:", error);
    }
    setOpenExcluir(false);
  }

  const closeIcon = (
    <svg fill="#3b9e68" viewBox="0 0 20 20" width={28} height={28}>
      <path d="M4.293 5.293a1 1 0 011.414 0L10 9.586l4.293-4.293a1 1 0 111.414 1.414L11.414 11l4.293 4.293a1 1 0 01-1.414 1.414L10 12.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 11 4.293 6.707a1 1 0 010-1.414z" />
    </svg>
  );

  return (
    <div className={classNames({
      [styles.dark]: temaEscuro,
      [styles.light]: !temaEscuro,
      [styles.container_detalhes]: true,
    })}>
      <Header temaEscuro={temaEscuro} />

      <div
        className={classNames({
          [styles.dark]: temaEscuro,
          [styles.light]: !temaEscuro,
          [styles.conteudo_detalhes]: true,
        })}
      >
        <div className={styles.imagens}>
          <img src={detalhes.imgMain} />
          <img src={detalhes.img1} />
          <img src={detalhes.img2} />
          <img src={detalhes.img3} />
          <img src={detalhes.img4} />
        </div>

        <div className={styles.texto_detalhes}>
          <div className="container_icons">
            <CiEdit
              style={{ color: "green", fontSize: "1.8em" }}
              onClick={() => setOpenEdit(true)}
            />
            <CiTrash
              style={{ color: "red", fontSize: "1.8em" }}
              onClick={() => setOpenExcluir(true)}
            />
          </div>

          <Modal
            open={openExcluir}
            onClose={() => setOpenExcluir(false)}
            classNames={{ modal: "customModal", }}
            closeIcon={closeIcon}
          >
            <div
              className={classNames({
                [styles.dark]: temaEscuro,
                [styles.light]: !temaEscuro,
                [styles.container_formModal]: true,
              })}
            >
              <p>Você tem certeza que deseja excluir esse item?</p>
              <div className={styles.divInterna}>
                <Link to={"/"} className={styles.link}>
                  <button onClick={excluirItem}>Sim</button>
                </Link>
                <button onClick={() => setOpenExcluir(false)}>Cancelar</button>
              </div>
            </div>
          </Modal>

          <Modal
            open={openEdit}
            onClose={() => setOpenEdit(false)}
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
                  setDadosEditados({ ...dadosEditados, nome: e.target.value })
                }
                value={dadosEditados.nome}
                placeholder="Nome do Hotel"
              ></input>
              <span>{validarErros.nome}</span>
              <input
                type="number"
                onChange={(e) =>
                  setDadosEditados({
                    ...dadosEditados,
                    estrelas: e.target.value,
                  })
                }
                value={dadosEditados.estrelas}
                placeholder="Classificação em Estrelas"
              ></input>
              <span>{validarErros.estrelas}</span>
              <input
                type="number"
                onChange={(e) =>
                  setDadosEditados({ ...dadosEditados, diaria: e.target.value })
                }
                value={dadosEditados.diaria}
                placeholder="Valor da Diária (ex: 500)"
              ></input>
              <span>{validarErros.diaria}</span>
              <div className={styles.divInterna}>
                <div>
                  <input
                    type="text"
                    onChange={(e) =>
                      setDadosEditados({
                        ...dadosEditados,
                        cidade: e.target.value,
                      })
                    }
                    value={dadosEditados.cidade}
                    placeholder="Cidade"
                  ></input>
                  <span>{validarErros.cidade}</span>
                </div>
                <div>
                  <input
                    type="text"
                    onChange={(e) =>
                      setDadosEditados({
                        ...dadosEditados,
                        estado: e.target.value,
                      })
                    }
                    value={dadosEditados.estado}
                    placeholder="Estado"
                  ></input>
                  <span>{validarErros.estado}</span>
                </div>
              </div>
              <p>Imagens</p>
              <input
                type="text"
                onChange={(e) =>
                  setDadosEditados({
                    ...dadosEditados,
                    imgMain: e.target.value,
                  })
                }
                value={dadosEditados.imgMain}
                placeholder="URL da Imagem Principal"
              ></input>
              <span>{validarErros.imgMain}</span>
              <input
                type="text"
                onChange={(e) =>
                  setDadosEditados({ ...dadosEditados, img2: e.target.value })
                }
                value={dadosEditados.img2}
                placeholder="URL de Imagem Adicional (opcional)"
              ></input>
              <input
                type="text"
                onChange={(e) =>
                  setDadosEditados({ ...dadosEditados, img3: e.target.value })
                }
                value={dadosEditados.img3}
                placeholder="URL de Imagem Adicional (opcional)"
              ></input>
              <input
                type="text"
                onChange={(e) =>
                  setDadosEditados({ ...dadosEditados, img4: e.target.value })
                }
                value={dadosEditados.img4}
                placeholder="URL de Imagem Adicional (opcional)"
              ></input>
              <p>Descrição</p>
              <textarea
                onChange={(e) =>
                  setDadosEditados({
                    ...dadosEditados,
                    descricaoCompleta: e.target.value,
                  })
                }
                value={dadosEditados.descricaoCompleta}
                placeholder="Descrição completa (ex: 'Localizado próximo a praia, o hotel combina a experiência tropical e luxuosa...')"
              ></textarea>
              <span>{validarErros.descricaoCompleta}</span>
              <textarea
                onChange={(e) =>
                  setDadosEditados({
                    ...dadosEditados,
                    descricaoDetalhada: e.target.value,
                  })
                }
                value={dadosEditados.descricaoDetalhada}
                placeholder="Descrição detalhada dos itens e serviços oferecidos (ex: Acomodações, Gastronomia, Lazer...)"
              ></textarea>
              <span>{validarErros.descricaoDetalhada}</span>
              <div className={styles.divInterna}>
                <button onClick={salvarEdit}>Salvar</button>
                <button onClick={cancelarEdit}>Cancelar</button>
              </div>
            </div>
          </Modal>

          <p>{detalhes.nome}</p>
          <p>{detalhes.descricaoCompleta}</p>
          <p>
            Classificação:{" "}
            {(() => {
              let estrelas = [];
              for (let index = 0; index < detalhes.estrelas; index++) {
                estrelas.push(<CiStar key={index} />);
              }
              return estrelas;
            })()}
          </p>
          <p>R$ {detalhes.diaria}</p>
          <p>
            Localizado em {detalhes.cidade}, {detalhes.estado}
          </p>
          <p>{detalhes.descricaoDetalhada}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
