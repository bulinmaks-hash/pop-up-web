export function FloatingCartButton({ count, onOpen }) {
  return (
    <button
      className="floating-cart"
      type="button"
      onClick={onOpen}
      aria-label={'Открыть корзину, товаров: ' + count}
      aria-haspopup="dialog"
    >
      <span className="floating-cart-label">Корзина</span>
      <span className="floating-cart-count" aria-hidden="true">{count}</span>
    </button>
  );
}