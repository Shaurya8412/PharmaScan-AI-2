"""
PharmaScan - SQLite History Database for Offline Audit Trail
"""

import sqlite3
import json
import os

DB_PATH = "scans_history.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS scan_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            medicine_id TEXT,
            brand_name TEXT,
            verdict TEXT,
            authenticity_score INTEGER,
            risk_factors_json TEXT
        )
    """)
    conn.commit()
    conn.close()

def save_scan_log(prediction_result):
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    med_info = prediction_result.get("medicine_info", {})
    cursor.execute("""
        INSERT INTO scan_logs (timestamp, medicine_id, brand_name, verdict, authenticity_score, risk_factors_json)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        prediction_result.get("timestamp"),
        med_info.get("id", "unknown"),
        med_info.get("brand_name", "Unknown Medicine"),
        prediction_result.get("verdict"),
        prediction_result.get("authenticity_score"),
        json.dumps(prediction_result.get("risk_factors", []))
    ))
    conn.commit()
    conn.close()

def fetch_scan_logs():
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, timestamp, brand_name, verdict, authenticity_score, risk_factors_json FROM scan_logs ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()

    logs = []
    for r in rows:
        logs.append({
            "id": r[0],
            "timestamp": r[1],
            "brand_name": r[2],
            "verdict": r[3],
            "authenticity_score": r[4],
            "risk_factors": json.loads(r[5]) if r[5] else []
        })
    return logs

def clear_scan_logs():
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM scan_logs")
    conn.commit()
    conn.close()
