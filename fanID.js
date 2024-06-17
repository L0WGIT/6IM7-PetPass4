let cropper;
        const idUpload = document.getElementById('idUpload');
        const idImage = document.getElementById('idImage');
        const cropButton = document.getElementById('cropButton');
        const photoUpload = document.getElementById('photoUpload');
        const photoImage = document.getElementById('photoImage');
        const cropPhotoButton = document.getElementById('cropPhotoButton');

        idUpload.addEventListener('change', (event) => {
            const files = event.target.files;
            if (files && files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    idImage.src = e.target.result;
                    idImage.style.display = 'block';
                    if (cropper) {
                        cropper.destroy();
                    }
                    cropper = new Cropper(idImage, {
                        aspectRatio: 1,
                        viewMode: 1,
                    });
                    cropButton.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        cropButton.addEventListener('click', () => {
            const canvas = cropper.getCroppedCanvas();
            const croppedImageDataUrl = canvas.toDataURL('image/png');
            // Aquí puedes manejar la imagen recortada, por ejemplo, subirla al servidor
            console.log(croppedImageDataUrl);
            // Reemplaza la imagen original con la recortada
            idImage.src = croppedImageDataUrl;
            cropper.destroy();
            cropButton.style.display = 'none';
        });

        photoUpload.addEventListener('change', (event) => {
            const files = event.target.files;
            if (files && files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoImage.src = e.target.result;
                    photoImage.style.display = 'block';
                    if (cropper) {
                        cropper.destroy();
                    }
                    cropper = new Cropper(photoImage, {
                        aspectRatio: 1,
                        viewMode: 1,
                    });
                    cropPhotoButton.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        cropPhotoButton.addEventListener('click', () => {
            const canvas = cropper.getCroppedCcanvas();
            const croppedImageDataUrl = canvas.toDataURL('image/png');
            // Aquí puedes manejar la imagen recortada, por ejemplo, subirla al servidor
            console.log(croppedImageDataUrl);
            // Reemplaza la imagen original con la recortada
            photoImage.src = croppedImageDataUrl;
            cropper.destroy();
            cropPhotoButton.style.display = 'none';
        });

        const takePhotoButton = document.getElementById('takePhotoButton');
        const videoPreview = document.getElementById('videoPreview');
        const captureButton = document.getElementById('captureButton');
        const canvas = document.getElementById('canvas');

        takePhotoButton.addEventListener('click', async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoPreview.srcObject = stream;
            videoPreview.style.display = 'block';
            captureButton.style.display = 'block';
        });

        captureButton.addEventListener('click', () => {
            const context = canvas.getContext('2d');
            canvas.width = videoPreview.videoWidth;
            canvas.height = videoPreview.videoHeight;
            context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);
            const imageDataUrl = canvas.toDataURL('image/png');
            
            // Mostrar la imagen capturada en photoImage
            photoImage.src = imageDataUrl;
            photoImage.style.display = 'block';

            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(photoImage, {
                aspectRatio: 1,
                viewMode: 1,
            });
            cropPhotoButton.style.display = 'block';

            videoPreview.srcObject.getTracks().forEach(track => track.stop());
            videoPreview.style.display = 'none';
            captureButton.style.display = 'none';
        });