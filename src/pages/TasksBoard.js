import { useState } from 'react';
import { Menu } from '../components/Menu'
import { Task } from '../components/Task';

export function PageTasksBoard() {
  // eslint-disable-next-line no-unused-vars
  const [list, setList] = useState([])

  return (
    <>
      <Menu />
      <div className="container-fluid" style={{ backgroundColor: '#f4f6f9', }}>
        <div className="d-flex justify-content-between">
          <div className="mt-2">
            <h3>Tasks Board</h3>
          </div>
          <div className="d-none d-sm-block mt-2 ">
            <ol className="breadcrumb d-flex justify-content-end">
              <button type="button" className="btn btn-sm btn-outline-dark me-2">
                <i className="fa-solid fa-plus me-2"></i>
                New Task
              </button>
            </ol>
          </div>
        </div>

        <div className='board d-flex overflow-auto mb-1' style={{ width: '99%', height: '100vh', marginLeft: 10, marginRight: 10 }}>
          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }}>
            <div className="card-header bg-dark text-white align-middle" style={{ borderRadius: '5px 5px 0 0' }}>
              <i className="fa-solid fa-list-check me-2"></i>
              Backlog
            </div>
            <div className="card-body overflow-auto mb-2 mb-2" style={{ backgroundColor: '#f0f0f1' }}>
              <Task
                title={"Adicionar nova cultura, no povoamento"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />

              <Task
                title={"Adicionar nova cultura, no povoamento"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />
              <Task
                title={"Adicionar nova cultura, no povoamento"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />
              <Task
                title={"Adicionar nova cultura, no povoamento"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />
              <Task
                title={"Adicionar nova cultura, no povoamento"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />
              <Task
                title={"Adicionar nova cultura, no povoamento"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />
              <Task
                title={"Adicionar nova cultura, no povoamento"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />
              <Task
                title={"Adicionar nova cultura, no povoamento"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />
            </div>
          </div>

          {list.map((value) => {
            return (
              <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '81vh' }} >
                <div className="card-header bg-success text-white" style={{ borderRadius: '5px 5px 0 0' }}>
                  <i className="fa-solid fa-check me-2"></i>
                  {value.title}
                </div>
                <div className="card-body overflow-auto mb-2" style={{ backgroundColor: '#f0f0f1' }}>
                  <Task
                    title={"Tela de cliente"}
                    border={"5px solid #198754"}
                    time={"Prazo: 01/02/2022"}
                    labels={[
                      {
                        name: 'Iniciado',
                        color: 'bg-primary'
                      },
                    ]}
                  />
                </div>
              </div>
            )
          })}

          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }} >
            <div className="card-header bg-success text-white" style={{ borderRadius: '5px 5px 0 0' }}>
              <i className="fa-solid fa-check me-2"></i>
              Finalizadas
            </div>
            <div className="card-body overflow-auto mb-2" style={{ backgroundColor: '#f0f0f1' }}>
              <Task
                title={"Tela de cliente"}
                border={"5px solid #198754"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />
            </div>
          </div>

          <div className=" me-2" style={{ minWidth: 160 }} >
            <button className="btn btn-sm btn-outline-primary mt-1" style={{ marginLeft: 20 }}>
              <i className="fa-solid fa-plus me-2"></i>
              New List</button>
          </div>
        </div>
      </div >
    </>
  );
}

