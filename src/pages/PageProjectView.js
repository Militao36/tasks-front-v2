import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Card } from "../components/Card";
import { Comments } from "../components/Comment";
import { Editor } from "../components/Editor";
import { Menu } from "../components/Menu";
import ProjectService from "../services/ProjectService";
import { Modal } from "../components/Modal";
import { ProjectCreateAndUpdated } from "../components/Project";
import { api } from "../config/api";

export function PageProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState({
    id: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    createdAt: "",
    updatedAt: "",
    status: '',
    users: [],
    timePast: {
      "days": 0,
      "hours": 0,
      "minutes": 0
    },
    deliveryDateObject: {
      "days": 0,
      "hours": 0,
      "minutes": 0
    },
    deliveryDate: "",
    expectedDate: "",
  })

  useEffect(() => {
    findById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  async function findById() {
    const data = await ProjectService.findById(id)

    const date = DateTime.local()

    const startDate = data.startDate ? DateTime.fromISO(data.startDate) : null
    const endDate = data.endDate ? DateTime.fromISO(data.endDate) : null
    const expectedDate = data.expectedDate ? DateTime.fromISO(data.expectedDate) : null
    const deliveryDate = data.deliveryDate ? DateTime.fromISO(data.deliveryDate) : null

    // tempo passado
    let timePast = null

    // data prevista
    let dateExpectedDate = null

    if (startDate?.isValid) {
      timePast = endDate?.isValid ?
        endDate.diff(startDate, ['day', 'hour', 'minute']).toObject()
        :
        date.diff(startDate, ['day', 'hour', 'minute']).toObject()
    }

    if (expectedDate?.isValid) {
      dateExpectedDate = deliveryDate?.isValid ?
        deliveryDate.diff(expectedDate, ['day', 'hour', 'minute'])?.toObject()
        :
        date.diff(expectedDate, ['day', 'hour', 'minute']).toObject()
    }
    console.log("data", data)
    setProject({
      id: data.id,
      title: data.title,
      description: data.description,
      startDate: startDate?.toFormat("yyyy-MM-dd'T'HH:mm") ?? "",
      endDate: endDate?.toFormat("yyyy-MM-dd'T'HH:mm") ?? "",
      users: data.users,
      status: data.status,
      timePast: {
        days: timePast?.days || 0,
        hours: timePast?.hours || 0,
        minutes: timePast?.minutes?.toFixed(0) || 0,
      },
      deliveryDateObject: {
        days: dateExpectedDate?.days || 0,
        hours: dateExpectedDate?.hours || 0,
        minutes: dateExpectedDate?.minutes?.toFixed(0) || 0,
      },
      deliveryDate: deliveryDate?.toFormat("yyyy-MM-dd'T'HH:mm") || "",
      expectedDate: expectedDate?.toFormat("yyyy-MM-dd'T'HH:mm") || ""
    })
  }

  function reload() {
    findById()
  }

  function openModalTaskEdit() {
    const modal = new window.bootstrap.Modal(document.getElementById('create-project-of-modal'))
    modal.show()
  }


  function change(key, value) {
    setProject({
      ...project,
      [key]: value
    })
  }

  async function updated() {
    const data = {
      ...project,
      startDate: project.startDate?.split('T').join(" "),
      endDate: project.endDate?.split('T').join(" "),
      expectedDate: project.expectedDate?.split('T').join(" "),
      deliveryDate: project.deliveryDate?.split('T').join(" "),
    }

    await api.put(`/projects/${id}`, data)

    alert("Atualizado com sucesso!")
  }

  return (
    <>
      <Menu />
      <div className="container-fluid">
        <div >
          <div className="d-flex justify-content-between mt-3">
            <h2>Detalhes do projeto</h2>
            <nav aria-label="breadcrumb ">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item" aria-current="page"><a href="/">Projeto</a></li>
                <li className="breadcrumb-item active" aria-current="page">View</li>
              </ol>
            </nav>
          </div>
        </div>
        <Card>
          <div className="row" style={{ minHeight: '80vh' }}>
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-4 d-flex align-items-stretch">
                  <div className="card shadow-sm" style={{ flex: 1 }}>
                    <div className="card-body text-center">
                      <h5 className="card-title text-muted">Membros <i className="fa-solid fa-user-group text-success"></i></h5>
                      <b className="card-text text-center text-muted mb-0">{project.users.length} membros</b>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 d-flex align-items-stretch">
                  <div className="card shadow-sm" style={{ flex: 1 }}>
                    <div className="card-body text-center">
                      <h5 className="card-title text-muted">Tempo gasto <i className="fa-solid fa-clock text-primary"></i></h5>
                      <b className="card-text text-center text-muted mb-0">
                        {project.timePast.days} dia(s), {project.timePast.hours} hora(s), {project.timePast.minutes} minuto(s)
                      </b>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 d-flex align-items-stretch">
                  <div className="card shadow-sm" style={{ flex: 1 }}>
                    <div className="card-body text-center">
                      <h5 className="card-title text-muted">Tempo de Atraso (Entrega) <i className="fa-solid fa-clock text-danger"></i></h5>
                      <b className="card-text text-center text-muted mb-0">
                        {project?.deliveryDateObject.days} dia(s), {project.deliveryDateObject.hours} hora(s), {project.deliveryDateObject.minutes} minuto(s)
                      </b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Editor value={project.description} />
                <hr />
                <Comments id={id} type={"project"} />
              </div>
            </div>
            <div className="col-sm-3">
              <div>
                <h3 className="bg-success text-light p-3 rounded" ><i className="fa-brands fa-buffer"></i>
                  {project.title}
                </h3>
              </div>

              <div className="text-muted mt-3">
                <p className="text-sm mt-2">Status
                  <b className="d-block"></b>
                  <select className="form-select form-select-sm" onChange={(e) => change('status', e.target.value)} value={project.status}>
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                  </select>
                </p>

                <p className="text-sm mt-2">Inicio
                  <input className="form-control form-control-sm me-2" type="datetime-local" value={project.startDate} onChange={(e) => change('startDate', e.target.value)} />
                </p>
                <p className="text-sm mt-2">Fim
                  <input className="form-control form-control-sm me-2" type="datetime-local" value={project.endDate} onChange={(e) => change('endDate', e.target.value)} />
                </p>

                <p className="text-sm mt-2">Data de Entrega
                  <input className="form-control form-control-sm me-2" type="datetime-local" value={project.deliveryDate} onChange={(e) => change('deliveryDate', e.target.value)} />
                </p>

                <p className="text-sm mt-2">Data Prevista de Entrega
                  <input className="form-control form-control-sm me-2" type="datetime-local" value={project.expectedDate} onChange={(e) => change('expectedDate', e.target.value)} />
                </p>
              </div>

              <div className="mt-3 text-muted">
                <h5>Lista de Membros</h5>
                <table className="table mt-2">
                  <thead></thead>
                  <tbody>
                    {project.users.map((user) => {
                      return (
                        <tr key={user.id} >
                          <td>{user.username}</td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>
              <div className="mt-3 mb-3">
                <button className="btn btn-sm btn-dark" style={{ marginRight: 5 }} onClick={openModalTaskEdit}>Editar</button>
                <button className="btn btn-sm btn-success" style={{ marginRight: 5 }} onClick={updated}>Salvar Alterações</button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Modal title={"Cadastro de Projetos"} ID={"create-project-of-modal"}>
        <ProjectCreateAndUpdated id={id} reload={reload} />
      </Modal>
    </>
  )
}