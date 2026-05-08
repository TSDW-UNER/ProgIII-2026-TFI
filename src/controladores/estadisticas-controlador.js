import EstadisticasServicio from "../servicios/estadisticas-servicio.js";

import PDFDocument from "pdfkit";

export default class EstadisticasControlador {

    constructor() {

        this.estadisticas = new EstadisticasServicio();
    }

    /*
    |--------------------------------------------------------------------------
    | OBTENER ESTADÍSTICAS
    |--------------------------------------------------------------------------
    */
    obtenerTurnos = async (req, res) => {

        try {

            const datos = await this.estadisticas.obtenerTurnos();

            res.status(200).json({
                estado: true,
                datos
            });

        } catch(error) {

            console.error(error);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno"
            });
        }
    }

    /*
    |--------------------------------------------------------------------------
    | GENERAR PDF
    |--------------------------------------------------------------------------
    */
    generarPDF = async (req, res) => {

        try {

            const datos = await this.estadisticas.obtenerTurnos();

            const doc = new PDFDocument();

            res.setHeader(
                'Content-Type',
                'application/pdf'
            );

            res.setHeader(
                'Content-Disposition',
                'inline; filename=estadisticas.pdf'
            );

            doc.pipe(res);

            /*
            |--------------------------------------------------------------------------
            | TÍTULO
            |--------------------------------------------------------------------------
            */
            doc
                .fontSize(20)
                .text('Estadísticas de Turnos', {
                    align: 'center'
                });

            doc.moveDown();

            /*
            |--------------------------------------------------------------------------
            | DATOS
            |--------------------------------------------------------------------------
            */
            datos.forEach((item) => {

                doc.text(
                    `Médico: ${item.medico_nombre} - Turnos: ${item.cantidad}`
                );
            });

            doc.end();

        } catch(error) {

            console.error(error);

            res.status(500).json({
                estado: false,
                mensaje: "Error al generar PDF"
            });
        }
    }
}