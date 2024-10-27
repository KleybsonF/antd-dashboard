import {
  Badge,
  BadgeProps,
  Modal,
  Space,
  Table,
  TableProps,
  Tag,
  TagProps,
  Typography,
} from 'antd';
import { Projects } from '../../../../types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { json } from 'react-router-dom';

type Props = {
  data: Projects[];
} & TableProps<any>;

export const ProjectsTable = ({ data, ...others }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

  const COLUMNS = [
    {
      title: 'Name',
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
      title: 'Client',
      dataIndex: 'client_name',
      key: 'proj_client_name',
    },
    {
      title: 'Category',
      dataIndex: 'project_category',
      key: 'proj_category',
      render: (_: any) => <span className="text-capitalize">{_}</span>,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'proj_priority',
      render: (_: any) => {
        let color: TagProps['color'];

        if (_ === 'low') {
          color = 'cyan';
        } else if (_ === 'medium') {
          color = 'geekblue';
        } else {
          color = 'magenta';
        }

        return (
          <Tag color={color} className="text-capitalize">
            {_}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'proj_status',
      render: (_: any) => {
        let status: BadgeProps['status'];

        if (_ === 'on hold') {
          status = 'default';
        } else if (_ === 'completed') {
          status = 'success';
        } else {
          status = 'processing';
        }

        return <Badge status={status} text={_} className="text-capitalize" />;
      },
    },
    {
      title: 'Team size',
      dataIndex: 'team_size',
      key: 'proj_team_size',
    },
    {
      title: 'Duration',
      dataIndex: 'project_duration',
      key: 'project_duration',
    },
    {
      title: 'Start date',
      dataIndex: 'start_date',
      key: 'proj_start_date',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (
        text: any,
        record: Projects // Receba os dados da linha
      ) => (
        <Space size={[10, 1]} wrap>
          <EditOutlined
            onClick={() => {
              setSelectedProject(record); // Armazene os dados do projeto selecionado
              setOpen(true); // Abra o modal
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
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>
          <strong>Name:</strong> {selectedProject?.project_name}
        </p>
        <p>
          <strong>Client:</strong> {selectedProject?.client_name}
        </p>
        <p>
          <strong>Category:</strong> {selectedProject?.project_category}
        </p>
        <p>
          <strong>Priority:</strong> {selectedProject?.priority}
        </p>
        <p>
          <strong>Status:</strong> {selectedProject?.status}
        </p>
        <p>
          <strong>Team Size:</strong> {selectedProject?.team_size}
        </p>
        <p>
          <strong>Duration:</strong> {selectedProject?.project_duration}
        </p>
        <p>
          <strong>Start Date:</strong> {selectedProject?.start_date}
        </p>
      </Modal>
    </>
  );
};
