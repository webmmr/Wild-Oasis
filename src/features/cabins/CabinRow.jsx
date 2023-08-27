/* eslint-disable react/prop-types */

import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "../cabins/CreateCabinForm";

import { formatCurrency } from "../../utilities/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;
const Description = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  color: var(--color-grey-500);
`;

const Price = styled.div`
  font-weight: 500;
`;

const Discount = styled.div`
  font-weight: 400;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    description,
    regularPrice,
    discount,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      image,
      name: `Copy of ${name}`,
      maxCapacity,
      description,
      regularPrice,
      discount,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />

      <Cabin>{name}</Cabin>
      <Description>Fits up to {maxCapacity} guests</Description>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <div>&mdash;</div>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                disabled={isCreating}
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* for opening the edit cabin form  in modal window*/}

            <Modal.Window name="edit">
              <CreateCabinForm cabinEdit={cabin} />
            </Modal.Window>

            {/* for opening the delete component in modal window */}

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}
export default CabinRow;
