import { Card, PageHeader, ProjectsTable } from '../../components';
import { Col, Row } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { useFetchData } from '../../hooks';

export const DefaultDashboardPage = () => {
  const stylesContext = useStylesContext();
  const {} = useFetchData('../mocks/TasksList.json');
  const { data: projectsData = [] } = useFetchData('../mocks/Projects.json');
  const {} = useFetchData('../mocks/Notifications.json');

  return (
    <div>
      <Helmet>
        <title>Default | Antd Dashboard</title>
      </Helmet>
      <PageHeader title="Dashboard" />
      <Row {...stylesContext?.rowProps}>
        <Col span={24}>
          <Card title="Listagem de Produtos">
            <ProjectsTable key="all-projects-table" data={projectsData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
