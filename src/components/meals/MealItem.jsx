import React from "react";
import styled from "styled-components";
import { MealsItemForm } from "./MealsItemForm";
import { useDispatch} from "react-redux";
import { addItem } from "../../store/basket/basketThunk";
import { snackbarActions } from "../../store/snackbar";

export const MealItem = ({ meal, successHandler, errorHandler, title }) => {
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);

  const addBasket = async (amount) => {
    const data = {
      id: meal._id,
      amount: amount,
    };
    try {
      await dispatch(addItem(data)).unwrap();
      dispatch(snackbarActions.doSuccess({ message: " Успешно добавлено " }));
    } catch (error) {
      dispatch(snackbarActions.doError({ message: "Что то пошло не так" }));
    }
  };

  return (
    <StyledItem>
      <StyledItemInfo>
        <StyledTitle>{meal.title}</StyledTitle>
        <DescriptionStyles>{meal.description}</DescriptionStyles>
        <span>{meal.price} $</span>
      </StyledItemInfo>
      <div>
        <MealsItemForm id={meal._id} price={meal.price} onAdd={addBasket} />
      </div>
    </StyledItem>
  );
};

const StyledItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d6d6d6;
  margin-bottom: 20px;

  :last-child {
    border: none;
    margin-bottom: -10px;
  }
`;

const StyledItemInfo = styled.div`
  margin-bottom: 20px;

  span {
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    color: #ad5502;
    margin-top: 4px;
  }
`;

const DescriptionStyles = styled.p`
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #222222;
`;

const StyledTitle = styled.h4`
  font-weight: 600;
  font-size: 18px;
  color: #222222;
`;
