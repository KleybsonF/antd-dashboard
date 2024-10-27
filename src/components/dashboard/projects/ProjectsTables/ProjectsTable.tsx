import { Modal, Space, Table, TableProps, Typography } from 'antd';
import { Projects } from '../../../../types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

type Props = {
  data: Projects[];
} & TableProps<any>;

export const ProjectsTable = ({ data, ...others }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

  // Declare as colunas com o tipo ColumnType<Projects>
  const COLUMNS: any[] = [
    {
      title: 'ID',
      dataIndex: 'team_size',
      key: 'proj_team_size',
    },
    {
      title: 'Produto',
      dataIndex: 'project_name',
      key: 'proj_name',
      render: (_: any, { project_name }: Projects) => (
        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          className="text-capitalize"
          style={{ marginBottom: 0 }}
        >
          {project_name.substring(0, 20)}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Quantidade',
      dataIndex: 'client_name',
      key: 'proj_client_name',
    },
    {
      title: 'Ação',
      key: 'action',
      width: 100,
      render: (_: any, record: Projects) => (
        <Space size={[10, 1]} wrap>
          <EditOutlined
            onClick={() => {
              setSelectedProject(record);
              setOpen(true);
            }}
          />
          <DeleteOutlined />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={data}
        columns={COLUMNS}
        className="overflow-scroll"
        {...others}
      />
      <Modal
        title="Detalhes do Projeto"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {selectedProject && (
          <div>
            <p>
              <strong>Name:</strong> {selectedProject.project_name}
            </p>
            <p>
              <strong>Client:</strong> {selectedProject.client_name}
            </p>
            <p>
              <strong>Category:</strong> {selectedProject.project_category}
            </p>
            <p>
              <strong>Priority:</strong> {selectedProject.priority}
            </p>
            <p>
              <strong>Status:</strong> {selectedProject.status}
            </p>
            <p>
              <strong>Team Size:</strong> {selectedProject.team_size}
            </p>
            <p>
              <strong>Duration:</strong> {selectedProject.project_duration}
            </p>
            <p>
              <strong>Start Date:</strong> {selectedProject.start_date}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};
