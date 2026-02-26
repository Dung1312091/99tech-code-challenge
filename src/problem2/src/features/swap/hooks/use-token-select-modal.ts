import { useState } from "react";
import type { Token } from "../types";

interface UseTokenSelectModalParams {
  fromToken: Token | null;
  toToken: Token | null;
  setFromToken: (token: Token | null) => void;
  setToToken: (token: Token | null) => void;
}

export interface UseTokenSelectModalReturn {
  modalFor: "from" | "to" | null;
  openModal: (side: "from" | "to") => void;
  closeModal: () => void;
  handleModalSelect: (token: Token) => void;
}

export function useTokenSelectModal({
  fromToken,
  toToken,
  setFromToken,
  setToToken,
}: UseTokenSelectModalParams): UseTokenSelectModalReturn {
  const [modalFor, setModalFor] = useState<"from" | "to" | null>(null);

  function openModal(side: "from" | "to") {
    setModalFor(side);
  }

  function closeModal() {
    setModalFor(null);
  }

  function handleModalSelect(token: Token) {
    if (modalFor === "from") {
      if (toToken?.currency === token.currency) setToToken(fromToken);
      setFromToken(token);
    } else {
      if (fromToken?.currency === token.currency) setFromToken(toToken);
      setToToken(token);
    }
    setModalFor(null);
  }

  return { modalFor, openModal, closeModal, handleModalSelect };
}
