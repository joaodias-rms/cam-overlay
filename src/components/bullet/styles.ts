import styled from 'styled-components/native';
import { design } from '../global/color.config';

interface Props {
    active?: boolean;
}

export const Container = styled.View<Props>`
    width: 8px;
    height: 8px;

    background-color: ${({ active }) =>
        active ? design.button_text : design.button};

    margin-left: 8px;
    border-radius: 3px;
`;
