document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content")
  const navLinks = document.querySelectorAll("nav a")

  // Fungsi untuk menangani navigasi
  function navigate(page) {
    switch (page) {
      case "home":
        renderHome()
        break
      case "length":
        renderLengthConverter()
        break
      case "time":
        renderTimeConverter()
        break
      case "shape":
        renderShapeCalculator()
        break
      default:
        renderHome()
    }
  }

  // Event listener untuk navigasi
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      navigate(e.target.dataset.page)
    })
  })

  // Render halaman beranda
  function renderHome() {
    mainContent.innerHTML = `
            <h1>Selamat Datang di Multi Konverter</h1>
            <p>Pilih salah satu opsi di menu navigasi untuk memulai konversi atau perhitungan.</p>
        `
  }

  // Render konverter panjang
  function renderLengthConverter() {
    mainContent.innerHTML = `
            <div class="converter">
                <h2>Konverter Satuan Panjang</h2>
                <div class="input-group">
                    <input type="number" id="length-input" placeholder="Masukkan nilai">
                    <select id="length-unit">
                        <option value="km">Kilometer</option>
                        <option value="m">Meter</option>
                        <option value="cm">Centimeter</option>
                        <option value="mm">Milimeter</option>
                    </select>
                </div>
                <button id="length-convert">Konversi</button>
                <div id="length-result" class="result"></div>
            </div>
        `

    const convertBtn = document.getElementById("length-convert")
    convertBtn.addEventListener("click", convertLength)
  }

  // Fungsi konversi panjang
  function convertLength() {
    const input = document.getElementById("length-input")
    const unit = document.getElementById("length-unit")
    const result = document.getElementById("length-result")

    const value = Number.parseFloat(input.value)
    const fromUnit = unit.value

    if (isNaN(value)) {
      result.innerHTML = "<p>Masukkan nilai yang valid</p>"
      return
    }

    const conversions = {
      km: { m: 1000, cm: 100000, mm: 1000000 },
      m: { km: 0.001, cm: 100, mm: 1000 },
      cm: { km: 0.00001, m: 0.01, mm: 10 },
      mm: { km: 0.000001, m: 0.001, cm: 0.1 },
    }

    let output = `<h3>Hasil Konversi ${value} ${fromUnit}:</h3><ul>`
    for (const toUnit in conversions[fromUnit]) {
      const converted = value * conversions[fromUnit][toUnit]
      output += `<li>${converted.toFixed(6)} ${toUnit}</li>`
    }
    output += `<li>${value} ${fromUnit}</li></ul>`

    result.innerHTML = output
  }

  // Render konverter waktu
  function renderTimeConverter() {
    mainContent.innerHTML = `
            <div class="converter">
                <h2>Konverter Satuan Waktu</h2>
                <div class="input-group">
                    <input type="number" id="time-input" placeholder="Masukkan nilai">
                    <select id="time-unit">
                        <option value="year">Tahun</option>
                        <option value="month">Bulan</option>
                        <option value="week">Minggu</option>
                        <option value="day">Hari</option>
                        <option value="hour">Jam</option>
                        <option value="minute">Menit</option>
                        <option value="second">Detik</option>
                    </select>
                </div>
                <button id="time-convert">Konversi</button>
                <div id="time-result" class="result"></div>
            </div>
        `

    const convertBtn = document.getElementById("time-convert")
    convertBtn.addEventListener("click", convertTime)
  }

  // Fungsi konversi waktu
  function convertTime() {
    const input = document.getElementById("time-input")
    const unit = document.getElementById("time-unit")
    const result = document.getElementById("time-result")

    const value = Number.parseFloat(input.value)
    const fromUnit = unit.value

    if (isNaN(value)) {
      result.innerHTML = "<p>Masukkan nilai yang valid</p>"
      return
    }

    const conversions = {
      year: { month: 12, week: 52, day: 365, hour: 8760, minute: 525600, second: 31536000 },
      month: { year: 1 / 12, week: 4, day: 30, hour: 720, minute: 43200, second: 2592000 },
      week: { year: 1 / 52, month: 1 / 4, day: 7, hour: 168, minute: 10080, second: 604800 },
      day: { year: 1 / 365, month: 1 / 30, week: 1 / 7, hour: 24, minute: 1440, second: 86400 },
      hour: { year: 1 / 8760, month: 1 / 720, week: 1 / 168, day: 1 / 24, minute: 60, second: 3600 },
      minute: { year: 1 / 525600, month: 1 / 43200, week: 1 / 10080, day: 1 / 1440, hour: 1 / 60, second: 60 },
      second: {
        year: 1 / 31536000,
        month: 1 / 2592000,
        week: 1 / 604800,
        day: 1 / 86400,
        hour: 1 / 3600,
        minute: 1 / 60,
      },
    }

    let output = `<h3>Hasil Konversi ${value} ${fromUnit}:</h3><ul>`
    for (const toUnit in conversions[fromUnit]) {
      const converted = value * conversions[fromUnit][toUnit]
      output += `<li>${converted.toFixed(6)} ${toUnit}</li>`
    }
    output += `<li>${value} ${fromUnit}</li></ul>`

    result.innerHTML = output
  }

  // Render kalkulator luas bangun datar
  function renderShapeCalculator() {
    mainContent.innerHTML = `
            <div class="converter">
                <h2>Kalkulator Luas Bangun Datar</h2>
                <select id="shape-select">
                    <option value="square">Persegi</option>
                    <option value="rectangle">Persegi Panjang</option>
                    <option value="triangle">Segitiga</option>
                    <option value="circle">Lingkaran</option>
                </select>
                <div id="shape-inputs"></div>
                <button id="calculate-area">Hitung Luas</button>
                <div id="shape-result" class="result"></div>
            </div>
        `

    const shapeSelect = document.getElementById("shape-select")
    const calculateBtn = document.getElementById("calculate-area")

    shapeSelect.addEventListener("change", updateShapeInputs)
    calculateBtn.addEventListener("click", calculateArea)

    updateShapeInputs()
  }

  // Fungsi untuk memperbarui input berdasarkan bentuk yang dipilih
  function updateShapeInputs() {
    const shape = document.getElementById("shape-select").value
    const inputsDiv = document.getElementById("shape-inputs")

    switch (shape) {
      case "square":
        inputsDiv.innerHTML = '<input type="number" id="side" placeholder="Sisi">'
        break
      case "rectangle":
        inputsDiv.innerHTML = `
                    <input type="number" id="length" placeholder="Panjang">
                    <input type="number" id="width" placeholder="Lebar">
                `
        break
      case "triangle":
        inputsDiv.innerHTML = `
                    <input type="number" id="base" placeholder="Alas">
                    <input type="number" id="height" placeholder="Tinggi">
                `
        break
      case "circle":
        inputsDiv.innerHTML = '<input type="number" id="radius" placeholder="Jari-jari">'
        break
    }
  }

  // Fungsi untuk menghitung luas
  function calculateArea() {
    const shape = document.getElementById("shape-select").value
    const result = document.getElementById("shape-result")
    let area, formula

    switch (shape) {
      case "square":
        const side = Number.parseFloat(document.getElementById("side").value)
        area = side * side
        formula = `Luas = sisi × sisi = ${side} × ${side} = ${area}`
        break
      case "rectangle":
        const length = Number.parseFloat(document.getElementById("length").value)
        const width = Number.parseFloat(document.getElementById("width").value)
        area = length * width
        formula = `Luas = panjang × lebar = ${length} × ${width} = ${area}`
        break
      case "triangle":
        const base = Number.parseFloat(document.getElementById("base").value)
        const height = Number.parseFloat(document.getElementById("height").value)
        area = 0.5 * base * height
        formula = `Luas = 1/2 × alas × tinggi = 1/2 × ${base} × ${height} = ${area}`
        break
      case "circle":
        const radius = Number.parseFloat(document.getElementById("radius").value)
        area = Math.PI * radius * radius
        formula = `Luas = π × r² = π × ${radius}² = ${area.toFixed(2)}`
        break
    }

    result.innerHTML = `
            <h3>Hasil Perhitungan:</h3>
            <p>Bentuk: ${shape}</p>
            <p>Rumus: ${formula}</p>
            <p>Luas: ${area.toFixed(2)}</p>
        `
  }

  // Inisialisasi halaman
  navigate("home")
})

