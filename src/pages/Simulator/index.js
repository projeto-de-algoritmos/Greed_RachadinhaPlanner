import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CgTrash } from "react-icons/cg";
import { RiGhost2Line } from "react-icons/ri";

import { knapsack } from "../../services/knapsack";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

import imgFlavio from "../../assets/flavio.png";

export function Simulator() {
    const [departments, setDepartments] = useState([]);
    const [limit, setLimit] = useState(0);
    const [value, setValue] = useState(0);
    const [weight, setWeight] = useState(0);
    const [name, setName] = useState("");

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

    const [results, setResults] = useState({
        orderedDepartsList: [
        ],
        totalEarnings: 0,
    });

    function clearForm() {
        setName("");
        setValue(0);
        setWeight(0);
    }

    function handleAddItem() {
        if (!value || !weight || name === "") {
            toast.dismiss();
            toast.error("Favor preencher todas as informações antes de confirmar.");
            return;
        }

        setIsAddModalOpen(false);
        setDepartments([
            ...departments,
            {
                name,
                value,
                weight,
            }
        ]);
        clearForm();
    }

    function handleKnapsack() {
        if (!limit) {
            toast.dismiss();
            toast.error("Escolha um limite para efetuar o cálculo.");
            return;
        }

        if (departments.length === 0) {
            toast.dismiss();
            toast.error("Adicione ao menos um departamento para efetuar o cáculo.");
            return;
        }

        try {
            const res = knapsack(departments, limit);
            setResults(res);
            setIsResultsModalOpen(true);
        } catch {
            toast.error("Erro ao realizar cálculo, favor tentar novamente.");
        }
    }

    return (
        <>  
            <label
                style={{
                    fontWeight: 700,
                    marginBottom: "0.6rem",
                }}
            >
                Nº de Segurança:
            </label>
            <input
                type="number"
                min="0"
                value={limit}
                placeholder="Nº de Segurança"
                onChange={({ target }) => {
                    setLimit(target.value);
                }}
            />
            <button
                className="run-btn"
                onClick={() => handleKnapsack()}
            >
                VER RESULTADO
            </button>
            <div
                className="add-container"
                onClick={() => setIsAddModalOpen(true)}
            >
                <b>Adicionar Departamentos</b>
                <IoMdAdd
                    size={20}
                    color="green"
                />
            </div>
            <div
                className="department-list"
            >
                {
                    departments.length ? (
                        <>
                            {
                                departments.map((department, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="department-item"
                                        >
                                            <div className="item-header">
                                                <b>{department.name}</b>
                                                <CgTrash
                                                    color="red"
                                                    size={20}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        const updatedItems = departments.filter((v, i) => i !== index);
                                                        setDepartments(updatedItems);
                                                    }}
                                                />
                                            </div>
                                            <p>Verba Total: {department.value}</p>
                                            <p>Funcionários: {department.weight}</p>
                                        </div>
                                    );
                                })
                            }
                        </>
                    ) : (
                        <b style={{ textAlign: "center" }}>Você ainda não adicionou nenhum departamento.</b>
                    )
                }
            </div>
            <Modal
                id="add"
                isOpen={isAddModalOpen}
                onRequestClose={() => {
                    clearForm();
                    setIsAddModalOpen(false);
                }}
            >
                <input
                    placeholder="Nome do Departamento"
                    onChange={({ target }) => {
                        setName(target.value);
                    }}
                />
                <input
                    type="number"
                    placeholder="Nº de Funcionários"
                    onChange={({ target }) => {
                        setWeight(target.value);
                    }}
                />
                <input
                    type="number"
                    placeholder="Verba Total"
                    onChange={({ target }) => {
                        setValue(target.value);
                    }}
                />
                <b
                    onClick={() => handleAddItem()}
                    style={{ color: "green", marginTop: "1rem", cursor: "pointer" }}
                >
                    Confirmar
                </b>
                <b
                    onClick={() => {
                        clearForm();
                        setIsAddModalOpen(false);
                    }}
                    style={{ color: "red", cursor: "pointer" }}
                >
                    Cancelar
                </b>
            </Modal>
            <Modal
                id="results"
                isOpen={isResultsModalOpen}
                onRequestClose={() => {
                    setIsResultsModalOpen(false);
                }}
            >
                <IoMdClose
                    size={20}
                    color="black"
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        cursor: "pointer",
                        opacity: 0.5
                    }}
                    onClick={() => setIsResultsModalOpen(false)}
                />
                <h1
                    style={{
                        marginBottom: "5rem"
                    }}
                >
                    RESULTADOS
                </h1>
                <p>
                    <b>Arrecadação Total: </b>
                    {results.totalEarnings}
                </p>
                <p>
                    <b>Bagatela da Família: </b>
                    {parseFloat((results.totalEarnings * 0.8).toFixed(2))}
                </p>
                <div className="results-departs-list">
                    {
                        results.orderedDepartsList.map((item) => {
                            return (
                                <div className="results-departs-item">
                                    <b
                                        style={{
                                            color: "green"
                                        }}
                                    >
                                        {item.department.name}
                                    </b>
                                    <p
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <RiGhost2Line
                                            color="black"
                                            size={20}
                                            style={{
                                                marginRight: "0.6rem"
                                            }}
                                        />
                                        <b
                                         style={{
                                             marginRight: "0.5rem"
                                         }}
                                        >
                                            Nº Funcionários a Contratar:
                                        </b>
                                        {item.amount}
                                    </p>
                                </div>
                            );
                        })
                    }
                </div>
                <b
                    style={{
                        color: "red",
                        cursor: "pointer",
                        textAlign: "center",
                    }}
                    onClick={() => {
                        setDepartments([]);
                        setLimit(0);
                        setResults({
                            orderedDepartsList: [
                            ],
                            totalEarnings: 0,
                        });
                        setIsResultsModalOpen(false);
                    }}
                >
                    CALCULAR NOVAMENTE
                </b>
            </Modal>
            <img
                src={imgFlavio}
                alt="Flávio Rachadinha"
                className="flavio"
            />
        </>
    );
}
