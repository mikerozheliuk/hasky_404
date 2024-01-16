document.addEventListener("DOMContentLoaded", function () {
  const face = document.getElementById("movableFace");
  const nose = document.querySelector(".nose");
  const head = document.getElementById("movableHead");
  const leftPupil = document.getElementById("pupil1");
  const rightPupil = document.getElementById("pupil2");
  const container = document.body;

  let isOverFace = false;

  face.addEventListener("mouseenter", function () {
    isOverFace = true;
  });

  face.addEventListener("mouseleave", function () {
    isOverFace = false;
  });

  container.addEventListener("mousemove", function (event) {
    moveElements(event);
  });

  function moveElements(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const faceOffsetX = calculateOffset(mouseX, 10); // зменшено чутливість
    const faceOffsetY = calculateOffset(mouseY, 10); // зменшено чутливість
    const noseOffsetX = calculateOffset(mouseX, 15); // чутливість носа
    const noseOffsetY = calculateOffset(mouseY, 15); // чутливість носа
    const headOffsetX = calculateOffset(mouseX, 5); // чутливість голови
    const headOffsetY = calculateOffset(mouseY, 5); // чутливість голови

    if (!isOverFace) {
      face.style.transform = `translate(${faceOffsetX}px, ${faceOffsetY}px)`;
      nose.style.transform = `translate(${noseOffsetX}px, ${noseOffsetY}px)`;
      head.style.transform = `translate(${headOffsetX}px, ${headOffsetY}px)`;

      movePupil(leftPupil, mouseX, mouseY, 2); // зменшено чутливість зіниць
      movePupil(rightPupil, mouseX, mouseY, 2); // зменшено чутливість зіниць
    }
  }

  function calculateOffset(offset, sensitivity) {
    return (offset / window.innerWidth - 0.5) * sensitivity;
  }

  function movePupil(pupil, mouseX, mouseY, sensitivity) {
    const boundingRect = pupil.getBoundingClientRect();
    const pupilCenterX = boundingRect.left + boundingRect.width / 2;
    const pupilCenterY = boundingRect.top + boundingRect.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;

    const angle = Math.atan2(deltaY, deltaX);
    const maxRadius = Math.min(boundingRect.width, boundingRect.height) / 4;
    const radius = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxRadius);

    const offsetX = Math.cos(angle) * radius * sensitivity;
    const offsetY = Math.sin(angle) * radius * sensitivity;

    pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
});
