const parcel_select = document.getElementById('parcel_select');

const updateParcel = (parcel_id) => {
  var parcelData = parcels.find((parcel) => parcel.id === +parcel_id);

  document.querySelector('input[name="shipment_id"]').value = parcelData.id;
  document.querySelector('input[name="parcel_width"]').value = parcelData.width;
  document.querySelector('input[name="parcel_height"]').value =
    parcelData.height;
  document.querySelector('input[name="parcel_length"]').value =
    parcelData.length;
  document.querySelector('input[name="parcel_weight"]').value =
    parcelData.weight;

  document.querySelector('input[name="parcel_status"]').value =
    parcelData.status;
  document.querySelector('input[name="sender_phone"]').value =
    parcelData.sender.phone;
  document.querySelector('input[name="sender_address"]').value =
    parcelData.sender.address;
  document.querySelector('input[name="reciever_phone"]').value =
    parcelData.reciever.phone;
  document.querySelector('input[name="reciever_address"]').value =
    parcelData.reciever.address;
};

updateParcel(parcel_select.value);

parcel_select.addEventListener('change', function () {
  var selectedParcelId = this.value;
  updateParcel(selectedParcelId);
});
