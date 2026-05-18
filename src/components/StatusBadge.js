// src/components/StatusBadge.js
import styled from 'styled-components';

const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.75rem;
  background-color: ${props => props.completed ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.completed ? '#166534' : '#991b1b'};
`;

export default function StatusBadge({ completed }) {
  return <Badge completed={completed}>{completed ? 'Completed' : 'Pending'}</Badge>;
}