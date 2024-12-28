function ItemImageCarousel() {
  return (
    <div className="item-image-carousel">
      <div className="item-image">
        <img src="/src/assets/gretsch-gold-white.png" alt="Gretsch guitare" />
      </div>
      <div className="carousel-indicators">
        <span className="carousel-indicator-selected" />
        <span className="carousel-indicator" />
        <span className="carousel-indicator" />
        <span className="carousel-indicator" />
        <span className="carousel-indicator" />
      </div>
    </div>
  );
}

export default ItemImageCarousel;
