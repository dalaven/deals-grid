export const useVuejsCsv = (JSONData, ReportTitle, ColumnsLabel) => {
  const vueJsCsvExport = (JSONData, ReportTitle, ColumnsLabel) => {
    const data = typeof JSONData === 'object' ? JSONData : JSON.parse(JSONData)
    let csvContent = 'sep=,\r\n'

    csvContent += ColumnsLabel.map((label) => `"${label}"`).join(',') + '\r\n'
    console.log(ColumnsLabel.map((label) => `"${label}"`).join(',') + '\r\n')
    console.log(ColumnsLabel)
    data.forEach((item, index) => {
      const row =
        typeof item === 'object'
          ? `${ColumnsLabel.map((label) => item[`xls_${label.id || label}`] ?? item[label.id ?? label]).join(',')}`
          : item

      csvContent += `${row}\r\n`
    })

    if (!csvContent) {
      alert('Invalid data')

      return
    }

    const uri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`
    const link = document.createElement('a')

    link.href = uri
    link.style.visibility = 'hidden'
    link.download = `${ReportTitle}.csv`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return { vueJsCsvExport }
}
