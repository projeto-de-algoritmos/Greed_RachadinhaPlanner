import React, { useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { CgTrash } from "react-icons/cg";

import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [departments, setDepartments] = useState([]);
  const [limit, setLimit] = useState(0);
  const [value, setValue] = useState(0);
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  return (
    <div className="App">
      <input
        placeholder="Peso Limite"
        onChange={({ target }) => {
          setLimit(target.value);
        }}
      />
      <div
        className="add-container"
        onClick={() => setIsAddModalOpen(true)}
      >
        <b>Adicionar Detartamentos</b>
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
            <b style={{ textAlign: "center" }}>Você ainda não possui nenhum funcionário</b>
          )
        }
      </div>
      <Modal
        id="add"
        isOpen={isAddModalOpen}
        styles={{
          width: "50%",
          height: "50%",
        }}
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
      <ToastContainer />
    </div>
  );
}

export default App;
