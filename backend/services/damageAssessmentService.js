const { sql, poolPromise } = require('../config/database');

class DamageAssessmentService {
  async getDamageAssessmentDetails(referenceNo, imageName) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('referenceNo', sql.NVarChar, referenceNo)
      .input('imageName', sql.NVarChar, imageName)
      .query(`
        SELECT 
          a.MLCaseImageAssessmentId as id,
          a.ImageName,
          a.CarPartMasterID,
          cp.CarPartName as partName,
          cp.PartType as metallurgy,
          CONCAT('P', RIGHT('00000' + CAST(cp.CarPartMasterID AS VARCHAR(5)), 5)) as partNumber,
          a.RepairReplaceID,
          a.ActualCostRepair as price,
          a.LabourRate as rate,
          a.LabourDentHrs as dentHrs,
          a.LabourRRHrs as rrHrs,
          a.LabourTotal as labourTotal,
          a.PaintLabour as labour,
          a.PaintMaterials as materials,
          a.PaintTotal as paintTotal
        FROM MLCaseImageAssessment a
        INNER JOIN MLImageAssessment ia ON a.MLImageAssessmentID = ia.MLImageAssessmentId
        INNER JOIN CarPartMaster cp ON a.CarPartMasterID = cp.CarPartMasterID
        WHERE ia.ReferenceNo = @referenceNo
          AND a.ImageName = @imageName
      `);
    return result.recordset;
  }

  async updateDamageAssessment(id, data) {
    try {
      const pool = await poolPromise;

      // First, get the current assessment data
      const currentData = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM MLCaseImageAssessment WHERE MLCaseImageAssessmentId = @id');

      if (!currentData.recordset[0]) {
        throw new Error('Assessment not found');
      }

      const current = currentData.recordset[0];

      // Prepare update query with only the fields that are provided
      let updateFields = [];
      let updateQuery = 'UPDATE MLCaseImageAssessment SET ';

      // Only include fields that are provided in the update data
      if (data.carPartMasterId !== undefined) {
        updateFields.push('CarPartMasterID = @carPartMasterId');
      }
      if (data.decision !== undefined) {
        updateFields.push('RepairReplaceID = @repairReplaceId');
      }
      if (data.price !== undefined) {
        updateFields.push('ActualCostRepair = @actualCostRepair');
      }
      if (data.rate !== undefined) {
        updateFields.push('LabourRate = @rate');
      }
      if (data.dentHrs !== undefined) {
        updateFields.push('LabourDentHrs = @dentHrs');
      }
      if (data.rrHrs !== undefined) {
        updateFields.push('LabourRRHrs = @rrHrs');
      }
      if (data.labourTotal !== undefined) {
        updateFields.push('LabourTotal = @labourTotal');
      }
      if (data.labour !== undefined) {
        updateFields.push('PaintLabour = @labour');
      }
      if (data.materials !== undefined) {
        updateFields.push('PaintMaterials = @materials');
      }
      if (data.paintTotal !== undefined) {
        updateFields.push('PaintTotal = @paintTotal');
      }

      if (updateFields.length === 0) {
        return; // No fields to update
      }

      updateQuery += updateFields.join(', ');
      updateQuery += ' WHERE MLCaseImageAssessmentId = @id';

      const request = pool.request()
        .input('id', sql.Int, id);

      // Only add parameters for fields that are being updated
      if (data.carPartMasterId !== undefined) {
        request.input('carPartMasterId', sql.Int, data.carPartMasterId);
      }
      if (data.decision !== undefined) {
        request.input('repairReplaceId', sql.Int, data.decision === 'Repair' ? 0 : 1);
      }
      if (data.price !== undefined) {
        request.input('actualCostRepair', sql.Decimal(10, 2), data.price);
      }
      if (data.rate !== undefined) {
        request.input('rate', sql.Decimal(10, 2), data.rate);
      }
      if (data.dentHrs !== undefined) {
        request.input('dentHrs', sql.Decimal(10, 2), data.dentHrs);
      }
      if (data.rrHrs !== undefined) {
        request.input('rrHrs', sql.Decimal(10, 2), data.rrHrs);
      }
      if (data.labourTotal !== undefined) {
        request.input('labourTotal', sql.Decimal(10, 2), data.labourTotal);
      }
      if (data.labour !== undefined) {
        request.input('labour', sql.Decimal(10, 2), data.labour);
      }
      if (data.materials !== undefined) {
        request.input('materials', sql.Decimal(10, 2), data.materials);
      }
      if (data.paintTotal !== undefined) {
        request.input('paintTotal', sql.Decimal(10, 2), data.paintTotal);
      }

      await request.query(updateQuery);
    } catch (error) {
      console.error('Error updating damage assessment:', error);
      throw error;
    }
  }

  async createDamageAssessment(data) {
    const pool = await poolPromise;
    
    const result = await pool.request()
      .input('carPartMasterId', sql.Int, data.carPartMasterId)
      .input('repairReplaceId', sql.Int, data.decision === 'Repair' ? 0 : 1)
      .input('actualCostRepair', sql.Decimal(10, 2), data.price || 0)
      .input('labourRate', sql.Decimal(10, 2), data.rate || 0)
      .input('labourDentHrs', sql.Decimal(10, 2), data.dentHrs || 0)
      .input('labourRRHrs', sql.Decimal(10, 2), data.rrHrs || 0)
      .input('labourTotal', sql.Decimal(10, 2), data.labourTotal || 0)
      .input('paintLabour', sql.Decimal(10, 2), data.labour || 0)
      .input('paintMaterials', sql.Decimal(10, 2), data.materials || 0)
      .input('paintTotal', sql.Decimal(10, 2), data.paintTotal || 0)
      .input('imageName', sql.NVarChar, data.imageName)
      .input('referenceNo', sql.NVarChar, data.referenceNo)
      .query(`
        INSERT INTO MLCaseImageAssessment (
          MLImageAssessmentID,
          CarPartMasterID,
          RepairReplaceID,
          ActualCostRepair,
          LabourRate,
          LabourDentHrs,
          LabourRRHrs,
          LabourTotal,
          PaintLabour,
          PaintMaterials,
          PaintTotal,
          ImageName
        )
        VALUES (
          (SELECT MLImageAssessmentId FROM MLImageAssessment WHERE ReferenceNo = @referenceNo),
          @carPartMasterId,
          @repairReplaceId,
          @actualCostRepair,
          @labourRate,
          @labourDentHrs,
          @labourRRHrs,
          @labourTotal,
          @paintLabour,
          @paintMaterials,
          @paintTotal,
          @imageName
        );
        SELECT SCOPE_IDENTITY() AS id;
      `);
    
    return result.recordset[0].id;
  }

  async deleteDamageAssessment(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM MLCaseImageAssessment WHERE MLCaseImageAssessmentId = @id');
  }
}

module.exports = new DamageAssessmentService();
